import { z } from "zod";

// 新規アカウント作成用スキーマ
export const createNewAccountSchema = z.object({
  email: z
    .email("IDはメールアドレス形式で入力してください。")
    .min(1, "IDを入力してください")
    .max(254, "IDは254文字以下で入力してください"),
  password: z.string().min(4, "パスワードは4文字以上で入力してください。"),
});

export type CreateNewAccountInput = z.infer<typeof createNewAccountSchema>;
