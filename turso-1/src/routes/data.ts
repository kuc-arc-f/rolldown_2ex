import express from 'express';
const router = express.Router();
import axios from 'axios';
import { createClient } from "@libsql/client";

router.post('/create', async function(req: any, res: any) {
  try {
    const turso = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const body = req.body;
    console.log(body);
    const sql_str = `INSERT INTO ${body.content} (data) VALUES(?);`;
    console.log("sql=", sql_str);

    await turso.execute({
      sql: sql_str,
      args: [body.data ],
    });

    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/list', async function(req: any, res: any) {
  try {
    const turso = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    const sql_str = `SELECT id, data ,created_at, updated_at 
    FROM ${req.query.content} ORDER BY created_at ASC`;
    const resp = await turso.execute({
      sql: sql_str,
    });

    //console.log(resp.rows)
    return res.json({ret:200 , data: resp.rows});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.post('/delete', async function(req: any, res: any) {
  try {
    const turso = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });    
    const body = req.body;
    console.log(body);
    const sql_str = `DELETE FROM ${body.content} WHERE id =?;`;
    console.log("sql=", sql_str);

    await turso.execute({
      sql: sql_str,
      args: [body.id ],
    });

    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/update', async function(req: any, res: any) {
  try {
    const turso = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });        
    const body = req.body;
    console.log(body);
    const sql_str = `UPDATE ${body.content} SET data = ? WHERE id = ?;`;
    console.log("sql=", sql_str);

    await turso.execute({
      sql: sql_str,
      args: [body.data, body.id ],
    });

    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


export default router;
