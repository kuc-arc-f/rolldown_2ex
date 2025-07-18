import express from 'express';
const router = express.Router();
//require('dotenv').config();
import axios from 'axios';


/**
*
* @param
*
* @return
*/
router.post('/send_post', async function(req: any, res: any) {
  try {
    //console.log("url=", process.env.API_URL);
    const url = import.meta.env.VITE_API_URL; 
//console.log(req.body);
    const path = req.body.api_url;	
console.log("path=", url + path);
    const response = await axios.post(url + path, req.body, 
    {headers: { 'Content-Type': 'application/json'}
    });
    const data = response.data;
//console.log(data);
    //@ts-ignore
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
