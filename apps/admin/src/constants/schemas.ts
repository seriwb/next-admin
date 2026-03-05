import { z } from "zod";

export const getRequiredStringSchema = (name: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, `${name}を入力してください`)
    .max(maxLength, `${name}は${maxLength}文字以下で入力してください`);

export const getOptionalStringSchema = (name: string, maxLength: number) =>
  z.string().trim().max(maxLength, `${name}は${maxLength}文字以下で入力してください`).optional();

export const requiredEmailSchema = z
  .email("メールアドレスの形式で入力してください")
  .min(1, "メールアドレスを入力してください")
  .max(254, "メールアドレスは254文字以下で入力してください");

// パスワード
export const passwordSchema = z
  .string()
  .min(4, "パスワードは4文字以上で入力してください")
  .max(128, "パスワードは128文字以下で入力してください");

// アカウント名（任意）
export const accountNameSchema = z
  .string()
  .max(255, "名前は255文字以下で入力してください")
  .optional()
  .or(z.literal(""));

// 権限
export const accountPrivilegeSchema = z.enum(["Normal", "Admin", "Owner"]);

// ステータス
export const accountStatusSchema = z.enum(["active", "inactive", "suspended"]);

// 注意事項（任意）
export const accountCautionSchema = z
  .string()
  .max(500, "注意事項は500文字以下で入力してください")
  .optional()
  .or(z.literal(""));

// パスワード一致チェック用refine
export const passwordMatchRefine = {
  check: (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword,
  params: { message: "パスワードが一致しません", path: ["confirmPassword"] },
};
