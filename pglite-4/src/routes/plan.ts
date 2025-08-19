import express from 'express';
const router = express.Router();
import axios from 'axios';
import { PGlite } from '@electric-sql/pglite'
export const db = new PGlite(process.env.DATA_DIR);

router.post('/create', async function(req: any, res: any) {
  try {
    const body = req.body;
    console.log(body);
    //await db.exec(`
    //INSERT INTO todo (title) VALUES ('${body.title}');
    //`);
    const { user_id, content, p_date } = req.body;
    await db.query(
      'INSERT INTO plan (user_id, content, p_date) VALUES ($1, $2, $3);',
      [user_id, content, p_date]
    );
    db.close();
    return res.json({ret:200 , data:{}});
  } catch (error) {
    db.close();
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/list_range', async function(req: any, res: any) {
  try {
    const body = req.body;
    console.log(body);
    const ret = await db.query(`
      SELECT * from plan
      WHERE 
      (
      p_date >= $1
      AND p_date < $2
      )
      AND user_id = $3    
      ORDER BY created_at DESC      
      ;
    `,
    [body.start, body.end, body.user_id])
    console.log(ret.rows)
    db.close();
    return res.json({ret:200 , data:ret.rows });
  } catch (error) {
    db.close();
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
