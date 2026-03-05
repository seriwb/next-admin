"use server";

import z from "zod";
import { serverPost } from "@/lib/server/private-api";
import type { ServerResult } from "@/types/app";
import { type CreateAccountInput, createAccountSchema } from "./lib";

// アカウント新規作成
export const createAccountAction = async (input: CreateAccountInput): Promise<ServerResult> => {
  const parsed = createAccountSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "入力内容が正しくありません",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await serverPost<ServerResult>("/api/admin/accounts", {
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name || undefined,
      privilege: parsed.data.privilege,
    });
    return result;
  } catch (error) {
    console.error("createAccountAction error:", error);
    return { success: false, error: "アカウントの作成に失敗しました" };
  }
};
