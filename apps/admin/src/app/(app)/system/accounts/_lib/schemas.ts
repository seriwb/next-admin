import { z } from "zod";

// アカウント一覧取得用スキーマ
export const listAccountSchema = z.object({
  query: z.string().optional(),
  sort: z.string().optional(),
  page: z.number().int().positive(),
  perPage: z.number().int().positive(),
});

export type ListAccountInput = z.infer<typeof listAccountSchema>;
