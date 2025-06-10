import { generateText, tool } from "ai";
import { z } from "zod";

// getPriceParam 200
export const getPriceParam = tool({
  description: "価格を取り出して、整数値のみ返却",
  //description: "価格を取り出して、返却する。",
  parameters: z.object({
    price: z.number(),
  }),
  execute: async ({ price }) => {
    return price;
  },
});
