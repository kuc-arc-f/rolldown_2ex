import express from 'express';
import LibConfig from "../lib/LibConfig";

const router = express.Router();
const COOKIE_NAME = LibConfig.COOKIE_NAME;

router.post('/login', async function(req: any, res: any) {
  const retObj = {ret: 500, data: null};
  try {
    const body = req.body
    console.log(body);
    const { username, password } = body;
    if (username === process.env.USER_NAME && password === process.env.PASSWORD) {
      //生存期間( msec ) Nday
      res.cookie(COOKIE_NAME , "1", {
        maxAge: 30 * 24 * 60 *  60 * 1000,
        httpOnly: false
      })
      return res.json(body);
    }
    return res.sendStatus(400);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
