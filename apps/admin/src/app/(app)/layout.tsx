import React from "react";
import { redirect } from "next/navigation";
import { ACCOUNT_STATUS } from "@/constants/application";
import { getAppSession } from "@/lib/auth";
import { AppLayout as Layout } from "./_layout";
import navigation, { filterNavigationByPrivilege } from "./_layout/sidebar/_nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();

  // 未認証・非アクティブユーザーはリダイレクト
  if (session?.user.status !== ACCOUNT_STATUS.active) {
    redirect("/signin");
  }

  const filteredNav = filterNavigationByPrivilege(navigation, session.user.privilege);

  return <Layout navigation={filteredNav}>{children}</Layout>;
}
