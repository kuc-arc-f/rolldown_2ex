import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

// getPriceUpDownMax 最低金額: 100 円 , 最高金額: 200 円の範囲内で最高値を返す
export const getPriceUpDownMax = tool({
  description: "購入品リスト 最低金額以上、最高金額以下の範囲内で最高値を返す。",
  parameters: z.object({
    lowPrice: z.number().min(1).describe("最低金額").optional().default(0),
    highPrice: z.number().min(1).describe("最高金額").optional().default(10000),
  }),
  execute: async ({ lowPrice , highPrice }) => {
    //console.log("lowPrice=", lowPrice);
    //console.log("highPrice=", highPrice);

    const sheetId = process.env.SPREADSHEET_ID_2;
    const apiKey = process.env.GOOGLE_AUTH_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/シート1!A1:D100?key=${apiKey}`;
    const response = await fetch(url); 

    if(response.ok === false){
      throw new Error("Error, response <> OK:");
    }
    const json = await response.json();
    //console.log(json.values);

    let rowMd = "";
    let targetRow = [];
    let priceTotal = 0;
    json.values.forEach((row, idx) => {
      let price = Number(row[2]);
      if(idx > 0 && row[0] &&
        (price >= lowPrice && price <= highPrice)
      )
      {
        targetRow.push(price)
      }
    });
    const max = Math.max(...targetRow);
    console.log("max=", max);
    return max;
  },
});
