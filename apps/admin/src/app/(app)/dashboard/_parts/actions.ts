"use server";

import type { AccountSummary } from "@/app/api/admin/accounts/route";
import { serverGet } from "@/lib/server/private-api";
import type { ServerResult } from "@/types/app";

// 今月追加されたアカウント一覧取得
export const getRecentAccountsAction = async (): Promise<ServerResult<AccountSummary[]>> => {
  try {
    const result = await serverGet<ServerResult<AccountSummary[]>>("/api/admin/dashboard/recent-accounts");
    return result;
  } catch (error) {
    console.error("getRecentAccountsAction error:", error);
    return { success: false, error: "最近追加されたアカウントの取得に失敗しました" };
  }
};
