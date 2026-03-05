import React from "react";
import { ACCOUNT_STATUS } from "@/constants/application";
import { getAppSession } from "@/lib/auth";
import { AppLayout as Layout } from "./_layout/app-layout";
import { NAVIGATIONS, filterNavigationByPrivilege } from "./_layout/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();

  if (session?.user.status !== ACCOUNT_STATUS.active) {
    return null;
  }

  const filteredNav = filterNavigationByPrivilege(NAVIGATIONS, session.user.privilege);

  return (
    <Layout navigation={filteredNav} userName={session.user.name ?? ""} userEmail={session.user.email}>
      {children}
    </Layout>
  );
}
