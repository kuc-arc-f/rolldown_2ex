import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

//getPriceListUp 150 円以上の。リストを markdown記法の表形式で表示して欲しい
export const getPriceListUp = tool({
  description: "購入品リスト、価格以上 markdown記法の表形式で表示します。",
  parameters: z.object({
    price: z.number().min(1).describe("価格の範囲値の最小値").optional().default(10),
  }),
  execute: async ({ price }) => {
    const sheetId = process.env.SPREADSHEET_ID_2;
    const apiKey = process.env.GOOGLE_AUTH_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/シート1!A1:D100?key=${apiKey}`;
    const response = await fetch(url); 

    if(response.ok === false){
      throw new Error("Error, response <> OK:");
    }
    const json = await response.json();
    //console.log(json);

    let rowMd = "";
    let targetRow = [];
    json.values.forEach((row, idx) => {
      let rowPrice = Number(row[2]);
      if(idx > 0 && row[0] &&
        (rowPrice >= price)
      )
      {
        let target = "| " + row[0];
        if(row[1]){
          target += " | " + row[1];  
        }
        if(row[2]){
          target += " | " + row[2];  
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
`;
    //console.log(text);
    return text;
  },
});
