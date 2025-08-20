import { PGlite } from '@electric-sql/pglite'
import 'dotenv/config'
console.log("DATA_DIR=", process.env.DATA_DIR)

//const db = new PGlite('./pgdata')
const db = new PGlite(process.env.DATA_DIR)
await db.exec(`
  CREATE TABLE IF NOT EXISTS todo (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT
  );
  INSERT INTO todo (title, content) VALUES ('Install PGlite from NPM', 'c1');
  INSERT INTO todo (title, content) VALUES ('Load PGlite', 'c1');
  INSERT INTO todo (title, content) VALUES ('Create a table', 'c1');
  INSERT INTO todo (title, content) VALUES ('Insert some data', 'c1');

  CREATE TABLE IF NOT EXISTS plan (
    id SERIAL PRIMARY KEY,
    user_id integer,
    content TEXT,
    p_date TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`)

// SELECT
const ret = await db.query(`
  SELECT * from todo;
`)
console.log(ret.rows)
