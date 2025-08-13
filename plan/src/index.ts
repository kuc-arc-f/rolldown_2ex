
import express from 'express';
import cookieParser from "cookie-parser";
import { renderToString } from 'react-dom/server';
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

import LibConfig from './lib/LibConfig';
import userRouter from './routes/user';
import commonRouter from './routes/common';

const app = express();
import 'dotenv/config'

import Top from './pages/App';
//import GitCount from './pages/GitCount';
//import ErChartShow from './pages/ErChartShow';
//import VueTodo11 from './pages/VueTodo11';
//import GitCountCrudIndex from './pages/GitCount/CrudIndex';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//console.log(process.env);

const errorObj = {ret: "NG", messase: "Error"};
const MODEL_NAME = "gemini-2.0-flash";

app.use('/api/common', commonRouter);
app.use('/api/user', userRouter);
// API
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
app.get("/vuetodo11", (req, res) => {
  res.send(VueTodo11());
});
//MPA

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
