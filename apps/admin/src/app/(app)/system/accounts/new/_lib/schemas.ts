import { z } from "zod";

// アカウント新規作成用スキーマ
export const createAccountSchema = z
  .object({
    email: z.email("メールアドレス形式で入力してください").max(254, "メールアドレスは254文字以下で入力してください"),
    password: z
      .string()
      .min(4, "パスワードは4文字以上で入力してください")
      .max(128, "パスワードは128文字以下で入力してください"),
    confirmPassword: z.string().min(4).max(128),
    name: z.string().max(255, "名前は255文字以下で入力してください").optional().or(z.literal("")),
    privilege: z.enum(["Normal", "Admin", "Owner"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
