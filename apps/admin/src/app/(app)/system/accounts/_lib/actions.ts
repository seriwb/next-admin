"use server";

import { serverDelete, serverGet } from "@/lib/server/private-api";
import type { ServerResult } from "@/types/app";
import type { AccountSummary } from "./types";

type GetAccountListParams = {
  page?: number;
  perPage?: number;
  query?: string;
  sort?: string;
};

// アカウント一覧取得
export const getAccountListAction = async (
  params: GetAccountListParams
): Promise<ServerResult<{ rows: AccountSummary[]; total: number }>> => {
  try {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.perPage) searchParams.set("perPage", String(params.perPage));
    if (params.query) searchParams.set("query", params.query);
    if (params.sort) searchParams.set("sort", params.sort);

    const result = await serverGet<ServerResult<{ rows: AccountSummary[]; total: number }>>(
      `/api/admin/accounts?${searchParams.toString()}`
    );
    return result;
  } catch (error) {
    console.error("getAccountListAction error:", error);
    return { success: false, error: "アカウント一覧の取得に失敗しました" };
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
