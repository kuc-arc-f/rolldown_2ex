import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

export const sheetListAgent = tool({
  description: "エージェント実行し、返却内容を表示して欲しい。",
  // ツールを呼び出すパラメータ
  parameters: z.object({}),
  execute: async () => {
    const sheetId = process.env.SPREADSHEET_ID_1;
    const apiKey = process.env.GOOGLE_AUTH_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/シート1!A1:C100?key=${apiKey}`;
    const response = await fetch(url); 
    if(response.ok === false){
      throw new Error("Error, response <> OK:");
    }
    const json = await response.json();
    const timeNum = new Date().getTime();
    const csvFileName = 'output_' + timeNum + '.csv';
    //console.log("csvFileName=", csvFileName);
    const csvWriter = createObjectCsvWriter({
      path: `./public/data/${csvFileName}`,
      header: [
        { id: 'id', title: 'id' },
        { id: 'title', title: 'title' },
        { id: 'date', title: 'date' }
      ]
    });
    const data = sheetGetItems(json.values)
    //console.log(data);
    await csvWriter.writeRecords(data);

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
        target += " | " + "\n";
        rowMd += target;
      }
    });
    
    let text = `***
| ID   | MEMO | DATE |
|:----:|:----:|:----:| 
${rowMd}
***
`;
    //console.log(text);
    return text;
  },
});
