import { generateText, tool } from "ai";
import { z } from "zod";
import RpcClient from '../lib/RpcClient'

const CMD_PATH = "/work/rust/extra/mcp_4/target/release/rust_mcp_server_4.exe"

export const getPriceList = tool({
  description: "購入品リストを、表示します。",
  // ツールを呼び出すパラメータ
  parameters: z.object({}),
  execute: async () => {
    const client = new RpcClient(CMD_PATH);

    const resp = await client.call(
      "tools/call", 
      { 
        name: "purchase_list", 
        arguments: null, 
      },
    );
  //console.log("add:", resp);
    client.close();
    let out  = "";
    try{
      if(resp.content[0]){
        const json = JSON.parse(resp.content[0].text)
        //console.log(json)
        let rowData = null;
        const target = [];
        json.forEach((item=>{
          rowData = JSON.parse(item.data)
          item.data = rowData;
          target.push(item)
        }));
        out = JSON.stringify(target);      
      }

    }catch(e){console.log(e)}
    //console.log(text);
    return "result : " + out;
  },
});
