import { generateText, tool } from "ai";
import { z } from "zod";
import dayjs  from 'dayjs';

export const firstGetDate = tool({
  description: "本日の 日付を返す。",
  parameters: z.object({
  }),
  execute: async () => {
    const dt = dayjs().format('YYYY-MM-DD')
    return dt;
  },
});
