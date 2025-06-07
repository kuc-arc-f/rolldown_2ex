
import express from 'express';
import { renderToString } from 'react-dom/server';
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';
import { getSheetTest } from './tools/getSheetTest';
import { getSheetCsv } from './tools/getSheetCsv';

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

    const result = await generateText({
    model: google(MODEL_NAME),
    tools: {
      getSheetTest , getSheetCsv
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
