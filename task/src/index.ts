
import express from 'express';
import cookieParser from "cookie-parser";
import { renderToString } from 'react-dom/server';
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

import LibConfig from './lib/LibConfig';
import userRouter from './routes/user';
import commonRouter from './routes/common';
import taskProjectRouter from './routes/task_project';

const app = express();
import 'dotenv/config'

import Top from './pages/App';
import TaskProject from './pages/TaskProject';
import TaskProjectShow from './pages/TaskProjectShow';
import TaskProjectCreate from './pages/TaskProjectCreate';
import TaskItemCreate from './pages/TaskItemCreate';
import TaskItemEdit from './pages/TaskItemEdit';
import TaskProjectExport from './pages/TaskProjectExport';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log(process.env);

const errorObj = {ret: "NG", messase: "Error"};
const MODEL_NAME = "gemini-2.0-flash";

//taskProjectRouter
app.use('/api/task_project', taskProjectRouter);
app.use('/api/common', commonRouter);
app.use('/api/user', userRouter);
// API
app.post('/api/apisend', async function(req: any, res: any) {
  try {
    const body = req.body;
    //console.log("url=", process.env.API_URL);
    const url = process.env.PUBLIC_API_URL; 
    const api_key = process.env.PUBLIC_API_KEY; 
    const path = body.api_path;	
    console.log("path=", url + path);
    body.api_key = api_key;
    console.log(body);
    const resp = await fetch(url + path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},      
      body: JSON.stringify(body)
    });
    if (resp.status !== 200) {
      throw new Error("Error, HTTP <> 200");
    } 
    const json = await resp.json();
    //console.log(json);
    return res.json(json);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//Middleware
/*
app.get('/*', function(req, res, next) {
  const COOKIE_NAME = LibConfig.COOKIE_NAME;
  if (req.path !== "/login") {
    if (!req.cookies[ COOKIE_NAME ]) {
      return res.redirect('/login');
    }
  }
  next();
});
*/

//MPA
app.get('/task_project_export', (req: any, res: any) => {
  try {
    res.send(renderToString(TaskProjectExport()));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/task_item_edit', (req: any, res: any) => {
  try {
    res.send(renderToString(TaskItemEdit()));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/task_item_create', (req: any, res: any) => {
  try {
    res.send(renderToString(TaskItemCreate()));
  } catch (error) {
    res.sendStatus(500);
  }
});
app.get('/task_project_create', (req: any, res: any) => {
  try {
    res.send(renderToString(TaskProjectCreate()));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/task_project_show', (req: any, res: any) => {
  try {
    res.send(renderToString(TaskProjectShow()));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/task_project', (req: any, res: any) => {
  try {
    res.send(renderToString(TaskProject()));
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
