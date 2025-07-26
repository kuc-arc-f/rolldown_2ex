import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

export const getPriceList = tool({
  description: "スプレッドシートのリスト、markdown記法の表形式で表示します。",
  // ツールを呼び出すパラメータ
  parameters: z.object({}),
  execute: async () => {
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
    json.values.forEach((row, idx) => {
      if(idx > 0 && row[0]) {
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
        target += " | " + "\n";
        rowMd += target;
      }
    });

    let text = `***
| ID   | Title | Price | DATE |
|:----:|:----:|:----:|:----:| 
${rowMd}
***
`;
    //console.log(text);
    return text;
  },
});
