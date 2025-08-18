import express from 'express';
const router = express.Router();
import axios from 'axios';
import { PGlite } from '@electric-sql/pglite'
//export const db = new PGlite('/tmp/pgdata');
export const db = new PGlite(process.env.DATA_DIR);

router.post('/create', async function(req: any, res: any) {
  try {
    const body = req.body;
      console.log(body);
    await db.exec(`
    INSERT INTO todo (title) VALUES ('${body.title}');
    `);
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/list', async function(req: any, res: any) {
  try {
    const ret = await db.query(`
      SELECT * from todo;
    `)
    console.log(ret.rows)
    return res.json({ret:200 , data:ret.rows });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.post('/delete', async function(req: any, res: any) {
  try {
    const body = req.body;
    //console.log("url=", process.env.API_URL);
console.log(body);
    await db.exec(`
    DELETE FROM todo WHERE id = ${body.id};
    `);
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/update', async function(req: any, res: any) {
  try {
    const body = req.body;
    console.log(body);
    await db.exec(`
    UPDATE todo SET title = '${body.title}' WHERE id = ${body.id};
    `);
    return res.json({ret:200 , data:{}});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


export default router;
