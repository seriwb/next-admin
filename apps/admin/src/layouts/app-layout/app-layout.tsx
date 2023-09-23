'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ss from './app-layout.module.scss';
import { Footer } from './footer';
import { Header } from './header';
import { ProtectedView } from './protected-view';
import { Sidebar } from './sidebar';

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const pathname = usePathname() ?? '';
  const { data: session } = useSession();
  const userPrivilege = session?.user.privilege as string;

  return (
    <ProtectedView>
      <div className={ss.container}>
        <Sidebar pathname={pathname} userPrivilege={userPrivilege} />
        <div className={ss.contents}>
          <Header />
          <div className={ss.page}>
            <main className={ss.main}>{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    </ProtectedView>
  );
};
