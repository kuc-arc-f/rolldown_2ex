import { generateText, tool } from "ai";
import { z } from "zod";
import { createObjectCsvWriter } from 'csv-writer';
import { sheetGetItems } from '../lib/dataUtil';

//getPriceUpTotal 150 円以上の。合計値を返す
export const getPriceUpTotal = tool({
  description: "購入品リスト、価格以上の合計値を返す。",
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
    let priceTotal = 0;
    json.values.forEach((row, idx) => {
      let rowPrice = Number(row[2]);
      if(idx > 0 && row[0] &&
        (rowPrice >= price)
      )
      {
        priceTotal += rowPrice;
        targetRow.push(row);
      }
    });
    //console.log(text);
    return priceTotal;
  },
});
