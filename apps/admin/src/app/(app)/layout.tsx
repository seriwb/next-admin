import React from "react";
import { redirect } from "next/navigation";
import { ACCOUNT_STATUS } from "@/constants/application";
import { NAVIGATION, filterNavigationByPrivilege } from "@/constants/navigation";
import { getAppSession } from "@/lib/auth";
import { AppLayout as Layout } from "./_layout";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();

  // 未認証・非アクティブユーザーはリダイレクト
  if (session?.user.status !== ACCOUNT_STATUS.active) {
    redirect("/signin");
  }

  const filteredNav = filterNavigationByPrivilege(NAVIGATION, session.user.privilege);

  return (
    <Layout navigation={filteredNav} userName={session.user.name ?? ""} userEmail={session.user.email}>
      {children}
    </Layout>
  );
}
