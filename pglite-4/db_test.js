import { PGlite } from '@electric-sql/pglite'
import 'dotenv/config'

export const db = new PGlite(process.env.DATA_DIR);

// SELECT
const ret = await db.query(`
  SELECT * from todo;
`)
console.log(ret.rows)
