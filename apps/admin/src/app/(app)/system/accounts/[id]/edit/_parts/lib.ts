import { z } from "zod";
import {
  accountCautionSchema,
  accountNameSchema,
  accountPrivilegeSchema,
  accountStatusSchema,
} from "@/constants/schemas";

// アカウント編集用スキーマ
export const editAccountSchema = z.object({
  name: accountNameSchema,
  privilege: accountPrivilegeSchema,
  status: accountStatusSchema,
  caution: accountCautionSchema,
});

export type EditAccountInput = z.infer<typeof editAccountSchema>;
