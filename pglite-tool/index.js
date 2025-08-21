
import readline from 'node:readline';
import 'dotenv/config';
import { PGlite } from '@electric-sql/pglite'
console.log("DATA_DIR=", process.env.DATA_DIR);


const startTool = async function(input){
  try{
    if(!process.env.DATA_DIR){
      console.error("error, .env DATA_DIR is not set");
      return;
    }
    const db = new PGlite(process.env.DATA_DIR)
    let sql = input;
    console.log("sql:");
    console.log(sql);

    if(sql.startsWith("SELECT")){
      console.log("SELECT result:");
      const ret = await db.query(`
        ${sql}
      `)
      console.log(ret.rows)
    }else{
      console.log("result:");
      await db.exec(`${sql}`);      
    }
  }catch(e){ console.error(e); }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
//console.log('複数行 又は、1行テキストを入力してください。単独行で「EOF」と入力すると終了します。');
console.log('複数行 又は、1行テキストを入力してください。');
console.log('単独行で「1」の後に改行を入力すると実行されます。');
console.log('input:');

let lines = [];
rl.on('line', line => {
  if (line === '1') {
    rl.close();
  } else {
    lines.push(line);
  }
});

rl.on('close', () => {
  const text = lines.join('\n');
  console.log('\n--- receive Text ---');
  console.log(text);
  startTool(text);
});

