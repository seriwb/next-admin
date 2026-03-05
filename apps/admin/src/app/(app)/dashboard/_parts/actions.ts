"use server";

import type { RecentAccountsResponse } from "@/app/api/admin/dashboard/recent-accounts/route";
import { serverGet } from "@/lib/server/private-api";
import type { ServerResult } from "@/types/app";

// 今月追加されたアカウント一覧取得（最新10件）と総数
export const getRecentAccountsAction = async (): Promise<ServerResult<RecentAccountsResponse>> => {
  try {
    const result = await serverGet<ServerResult<RecentAccountsResponse>>("/api/admin/dashboard/recent-accounts");
    return result;
  } catch (error) {
    console.error("getRecentAccountsAction error:", error);
    return { success: false, error: "最近追加されたアカウントの取得に失敗しました" };
  }
};
