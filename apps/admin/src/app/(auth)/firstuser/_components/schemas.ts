import { z } from "zod";

// 初回ユーザー登録用スキーマ
export const createFirstAccountSchema = z.object({
  username: z.string().email("IDはメールアドレス形式で入力してください。"),
  password: z.string().min(4, "パスワードは4文字以上で入力してください。"),
});

export type CreateFirstAccountInput = z.infer<typeof createFirstAccountSchema>;
