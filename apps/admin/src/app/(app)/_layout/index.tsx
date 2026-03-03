"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { Header } from "./header";
import { ProtectedView } from "./protected-view";
import type { Navigation } from "./sidebar/_nav";
import { Sidebar } from "./sidebar/index";

type Props = {
  children: React.ReactNode;
  navigation: Navigation[];
};

export const AppLayout = ({ children, navigation }: Props) => {
  const pathname = usePathname() ?? "";

  return (
    <ProtectedView>
      <div className="flex flex-row">
        <Sidebar pathname={pathname} navigation={navigation} />
        <div className="flex-[1_0_auto] bg-primary-foreground">
          <Header />
          <main className="m-6">{children}</main>
          <Footer />
        </div>
      </div>
    </ProtectedView>
  );
};
