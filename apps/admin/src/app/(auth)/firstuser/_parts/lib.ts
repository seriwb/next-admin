import { z } from "zod";
import { passwordMatchRefine, passwordSchema, requiredEmailSchema } from "@/constants/schemas";

// 初回ユーザー登録フォーム用スキーマ（confirmPasswordを含む）
export const firstUserFormSchema = z
  .object({
    username: requiredEmailSchema,
    password: z.string().min(1, "このフィールドは必須です。").pipe(passwordSchema),
    confirmPassword: z.string().min(1, "このフィールドは必須です。").pipe(passwordSchema),
  })
  .refine(passwordMatchRefine.check, passwordMatchRefine.params);

export type FirstUserFormInput = z.infer<typeof firstUserFormSchema>;

// Better Auth用のエラーメッセージ
export const ErrorMessages: Record<string, string> = {
  Signin: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  CredentialsSignin: "Sign up failed. Check the details you provided are correct.",
  INVALID_EMAIL_OR_PASSWORD: "Sign up failed. Check the details you provided are correct.",
  default: "Unable to sign up.",
};
