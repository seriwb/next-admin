import { z } from "zod";
import {
  accountNameSchema,
  accountPrivilegeSchema,
  passwordMatchRefine,
  passwordSchema,
  requiredEmailSchema,
} from "@/constants/schemas";

// アカウント新規作成用スキーマ
export const createAccountSchema = z
  .object({
    email: requiredEmailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    name: accountNameSchema,
    privilege: accountPrivilegeSchema,
    sendInvite: z.boolean(),
  })
  .refine(passwordMatchRefine.check, passwordMatchRefine.params);

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
