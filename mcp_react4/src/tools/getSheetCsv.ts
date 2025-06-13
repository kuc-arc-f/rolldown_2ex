import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

export const getSheetCsv = tool({
  description: "CSVダウンロードのリンク表示",
  // ツールを呼び出すパラメータ
  parameters: z.object({}),
  execute: async () => {
    const sheetId = process.env.SPREADSHEET_ID_1;
    const apiKey = process.env.GOOGLE_AUTH_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/シート1!A1:C100?key=${apiKey}`;
    //console.log("url=", url);
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
    let csvUrl =  process.env.CSV_PATH_BASE + "/" + csvFileName;
    
    let text = `***
* 下記リンクをおすと、CSVダウンロードできます。
${csvUrl}
`;
    //console.log(text);
    return text;
  },
});
