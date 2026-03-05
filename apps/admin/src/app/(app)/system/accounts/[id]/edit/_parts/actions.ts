"use server";

import z from "zod";
import type { AccountDetail } from "@/app/api/admin/accounts/[id]/route";
import { serverDelete, serverGet, serverPut } from "@/lib/server/private-api";
import type { ServerResult } from "@/types/app";
import { type EditAccountInput, editAccountSchema } from "./lib";

// アカウント詳細取得
export const getAccountAction = async (id: string): Promise<ServerResult<AccountDetail>> => {
  try {
    const result = await serverGet<ServerResult<AccountDetail>>(`/api/admin/accounts/${id}`);
    return result;
  } catch (error) {
    console.error("getAccountAction error:", error);
    return { success: false, error: "アカウントの取得に失敗しました" };
  }
};

// アカウント更新
export const updateAccountAction = async (id: string, input: EditAccountInput): Promise<ServerResult> => {
  const parsed = editAccountSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "入力内容が正しくありません",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await serverPut<ServerResult>(`/api/admin/accounts/${id}`, {
      name: parsed.data.name || undefined,
      privilege: parsed.data.privilege,
      status: parsed.data.status,
      caution: parsed.data.caution || undefined,
    });
    return result;
  } catch (error) {
    console.error("updateAccountAction error:", error);
    return { success: false, error: "アカウントの更新に失敗しました" };
  }
};

// アカウント削除
export const deleteAccountAction = async (id: string): Promise<ServerResult> => {
  try {
    const result = await serverDelete<ServerResult>(`/api/admin/accounts/${id}`);
    return result;
  } catch (error) {
    console.error("deleteAccountAction error:", error);
    return { success: false, error: "アカウントの削除に失敗しました" };
  }
};
