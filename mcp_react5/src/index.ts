
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
import { getPriceUpDownMin } from './tools/getPriceUpDownMin';
import { getPriceUpDownMax } from './tools/getPriceUpDownMax';

import { firstGetRandom } from './tools/firstGetRandom';
import { firstGetDate } from './tools/firstGetDate';
import { firstGetTime } from './tools/firstGetTime';

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
app.post('/api/chat', async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log(body)
    const item = {
      appName: body.appName,
      userId: body.userId,
      sessionId: body.sessionId,
      newMessage: {
        role: "user",
        parts: [{
          text: body.messages 
        }]
      }
    };
    console.log(item)
    const sendBody = JSON.stringify(item);	
    const url = process.env.ADK_API_URL;	
    console.log("url=", url)
    const response = await fetch( url + "/run", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      body: sendBody
    });
    if(response.ok === false){
      console.error("Error, res.ok = NG");
      throw new Error("Error, res.ok = NG");
    }
    const json = await response.json();    
    const outIndex = json.length - 1;
    console.log("#outIndex=", outIndex);
    console.log("artifact:");
    if(json[outIndex]){
      const target = json[outIndex].content;
      console.log(target.parts);
      if(target.parts[0]){
        console.log("text=", target.parts[0].text);
        return res.send({ret: 200, text: target.parts[0].text});
      }else{
        console.log("text= NULL");
      }
    }
    res.send({ret: 200, text: ""});
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/api/adk_init', async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log(body)
    const urlBase = process.env.ADK_API_URL;	
    const path = urlBase + `/apps/${body.appName}/users/${body.userId}/sessions/${body.sessionId}`;	
    const respose = await fetch(path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      //body: {}
    });
    if(respose.ok === false){
      console.error("Error, res.ok = NG");
      throw new Error("Error, res.ok = NG");
    }

    res.send({ret: 200, text: ""});
  } catch (e) {
    console.log(e);
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
