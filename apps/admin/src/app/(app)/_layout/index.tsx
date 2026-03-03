"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Navigation } from "@/constants/navigation";
import { ProtectedView } from "./protected-view";
import { AppSidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
  navigation: Navigation[];
  userName: string;
  userEmail: string;
};

export const AppLayout = ({ children, navigation, userName, userEmail }: Props) => {
  const pathname = usePathname() ?? "";

  return (
    <ProtectedView>
      <SidebarProvider>
        <AppSidebar pathname={pathname} navigation={navigation} userName={userName} userEmail={userEmail} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb />
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
          <footer className="p-4 text-right text-sm text-muted-foreground">
            <a
              href="https://github.com/seriwb/next-admin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              next-admin
            </a>
            <span className="ml-4">©seri</span>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedView>
  );
};
