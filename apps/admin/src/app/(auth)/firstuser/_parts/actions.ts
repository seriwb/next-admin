"use server";

import z from "zod";
import { serverGet, serverPost } from "@/lib/server/public-api";
import type { ServerResult } from "@/types/app";
import { type FirstUserFormInput, firstUserFormSchema } from "./lib";

export const checkActiveAccountExist = async (): Promise<ServerResult<boolean>> => {
  try {
    const result = await serverGet<ServerResult<boolean>>("/api/accounts/check-active-account-exist");
    if (result.success) {
      return { success: true, data: result.data ?? false };
    } else {
      console.error(result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("Failed to check active account existence:", error);
    return {
      success: false,
      error: "アクティブなアカウントの存在確認に失敗しました",
    };
  }
};

export const createNewAccount = async (props: FirstUserFormInput): Promise<ServerResult> => {
  const parsed = firstUserFormSchema.safeParse(props);
  if (!parsed.success) {
    return {
      success: false,
      error: "入力内容が正しくありません",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const result = await serverPost<ServerResult>("/api/accounts/create-first-account", {
      email: props.username,
      password: props.password,
    });
    return result;
  } catch (error) {
    console.error("Failed to create new account:", error);
    return {
      success: false,
      error: "新しいアカウントの作成に失敗しました",
    };
  }
};
