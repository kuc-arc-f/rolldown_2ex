
import express from 'express';
import { renderToString } from 'react-dom/server';
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

import { getSheetTest } from './tools/getSheetTest';
import { getSheetCsv } from './tools/getSheetCsv';
import { getPriceList } from './tools/getPriceList';
import { getPriceListUp } from './tools/getPriceListUp';
import { getPriceParam } from './tools/getPriceParam';
import { getPriceUpTotal } from './tools/getPriceUpTotal';
import { getPriceUpDown } from './tools/getPriceUpDown';
import { getPriceUpDownTotal } from './tools/getPriceUpDownTotal';
import { firstGetRandom } from './tools/firstGetRandom';
import { firstGetDate } from './tools/firstGetDate';
import { firstGetTime } from './tools/firstGetTime';

import { SheetListAgent } from './agent/sheet-list-agent';
import { PriceListUpAgent } from './agent/price-list-up-agent';
import { PriceListUpdownAgent } from './agent/price-list-updown-agent';
import { firstAgent } from './agent/first-agent';

const app = express();
import 'dotenv/config'

import Top from './pages/App';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log(process.env);

const errorObj = {ret: "NG", messase: "Error"};
const MODEL_NAME = "gemini-2.0-flash";

//app.use('/api/common', commonRouter);
// API
app.post('/api/agent', async (req: any, res: any) => {
  try {
    console.log("# /api/agent")
    const body = req.body;

    console.log(body);
    let result = "";
    if(body.agent_name === "sheet-list-agent"){
      result = await SheetListAgent();
    }else if(body.agent_name === "price-list-updown-agent"){
      result = await PriceListUpdownAgent(body.messages);
    }else if(body.agent_name === "first-agent"){
      result = await firstAgent();
    }else{
      result = await PriceListUpAgent(body.messages);
    }
    //console.log(result);

    return res.send({ret: 200, text: result});
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api/chat', async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log(body)

    const result = await generateText({
      model: google(MODEL_NAME),
      tools: {
        getSheetTest , getSheetCsv , getPriceList , getPriceParam , 
        getPriceListUp , getPriceUpTotal , getPriceUpDown , getPriceUpDownTotal , 
        firstGetRandom , firstGetDate , firstGetTime ,
      },
      maxSteps: 5,
      messages: [{ role: "user", content: body.messages }],
    });
    console.log("artifact:");
    console.log(result.text);

    res.send({ret: 200, text: result.text});
  } catch (error) {
    res.sendStatus(500);
  }
});

// SPA
app.get('/*', (req: any, res: any) => {
  try {
    res.send(renderToString(Top()));
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
const PORT = 3000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
