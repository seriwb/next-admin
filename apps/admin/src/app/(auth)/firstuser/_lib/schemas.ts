import { z } from "zod";

// 初回ユーザー登録フォーム用スキーマ（confirmPasswordを含む）
export const firstUserFormSchema = z
  .object({
    username: z
      .email("IDはメールアドレス形式で入力してください。")
      .min(1, "このフィールドは必須です。")
      .max(128, "IDは128文字以内で入力してください。"),
    password: z
      .string()
      .min(1, "このフィールドは必須です。")
      .min(4, "パスワードは4文字以上で入力してください。")
      .max(128, "パスワードは128文字以内で入力してください。"),
    confirmPassword: z
      .string()
      .min(1, "このフィールドは必須です。")
      .min(4, "パスワードは4文字以上で入力してください。")
      .max(128, "パスワードは128文字以内で入力してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  });

export type FirstUserFormInput = z.infer<typeof firstUserFormSchema>;
