import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

//getPriceUpDown 最低金額: 100 円 , 最高金額: 200 円。リストを表形式で表示して欲しい
//getPriceUpDown 最低金額: 100 円 , 最高金額: 200 円。markdown記法の表形式で表示します。
export const getPriceUpDown = tool({
  description: "購入品リスト 最低金額、最高金額を入力し markdown記法の表形式で表示します。",
  parameters: z.object({
    lowPrice: z.number().min(1).describe("最低金額").optional().default(0),
    highPrice: z.number().min(1).describe("最高金額").optional().default(10000),
  }),
  execute: async ({ lowPrice , highPrice }) => {
    const sheetId = process.env.SPREADSHEET_ID_2;
    const apiKey = process.env.GOOGLE_AUTH_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/シート1!A1:D100?key=${apiKey}`;
    const response = await fetch(url); 

    if(response.ok === false){
      throw new Error("Error, response <> OK:");
    }
    const json = await response.json();
    console.log(json.values);

    let rowMd = "";
    let targetRow = [];
    json.values.forEach((row, idx) => {
      let price = Number(row[2]);
      if(idx > 0 && row[0] &&
        (price >= lowPrice && price <= highPrice)
      )
      {
        let target = "| " + row[0];
        if(row[1]){
          target += " | " + row[1];  
        }
        if(row[2]){
          target += " | " + row[2] + " 円";;  
        }
        if(row[3]){
          target += " | " + row[3];  
        }
        targetRow.push(row);
        target += " | " + "\n";
        rowMd += target;
      }
    });
    //console.log("targetRow.count=", targetRow.length);

    let text = `***
| ID   | Title | Price | DATE |
|:----:|:----:|:----:|:----:| 
${rowMd}
***
`;
    console.log(text);
    return text;
  },
});
