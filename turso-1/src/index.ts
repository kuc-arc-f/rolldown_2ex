
import express from 'express';
import { renderToString } from 'react-dom/server';

const app = express();
import 'dotenv/config'

import Top from './pages/App';
import dataRouter from './routes/data';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("TURSO_DATABASE_URL=", process.env.TURSO_DATABASE_URL)
//console.log(process.env); 

const errorObj = {ret: "NG", messase: "Error"};

app.use('/api/data', dataRouter);
// API
app.post('/api/chat', async (req, res) => {
  try {
    const body = req.body;
    console.log(body)

    res.send({ret: 200, text: ""});
  } catch (error) {
    res.sendStatus(500);
  }
});

// SPA
app.get('/*', (req, res) => {
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
