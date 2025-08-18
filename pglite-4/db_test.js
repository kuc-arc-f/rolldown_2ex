import { PGlite } from '@electric-sql/pglite'

//const db = new PGlite('./pgdata')
const db = new PGlite('/tmp/pgdata')

// SELECT
const ret = await db.query(`
  SELECT * from todo;
`)
console.log(ret.rows)
