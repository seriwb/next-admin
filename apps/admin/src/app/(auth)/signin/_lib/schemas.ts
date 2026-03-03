import { z } from "zod";

// サインイン用スキーマ
export const signInSchema = z.object({
  username: z.string().max(128),
  password: z.string().max(128),
});

export type SignInInput = z.infer<typeof signInSchema>;
