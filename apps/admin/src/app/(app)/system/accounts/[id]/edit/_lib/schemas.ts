import { z } from "zod";

// アカウント編集用スキーマ
export const editAccountSchema = z.object({
  name: z.string().max(255, "名前は255文字以下で入力してください").optional().or(z.literal("")),
  privilege: z.enum(["Normal", "Admin", "SuperAdmin"]),
  status: z.enum(["active", "inactive", "suspended"]),
  caution: z.string().max(500, "注意事項は500文字以下で入力してください").optional().or(z.literal("")),
});

export type EditAccountInput = z.infer<typeof editAccountSchema>;
