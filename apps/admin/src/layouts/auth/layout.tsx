import clsx from 'clsx';
import Link from 'next/link';
import { APP_NAME } from '@/constants/application';
import ss from './layout.module.scss';
import { ProtectedView } from './protected-view';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <ProtectedView>
      <div className={ss.content}>
        <Link href={'/'} className={ss.logo}>
          {APP_NAME}
        </Link>
        <main className={clsx(ss.main)}>{children}</main>
      </div>
    </ProtectedView>
  );
};
