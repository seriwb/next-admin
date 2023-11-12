'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthLayout } from '@/layouts/auth-layout';
import SigninPage from './(auth)/signin/page';

const DEFAULT_VIEW = '/dashboard';

const Page = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const isUser = !!session?.user;
  const activated = session?.user.status === 'active';

  useEffect(() => {
    if (loading) {
      return;
    }
    if (isUser) {
      router.push(DEFAULT_VIEW);
    }
  }, [loading, isUser, router]);

  if (loading) {
    return <></>;
  }

  if (!isUser || !activated) {
    return (
      <AuthLayout>
        <SigninPage />
      </AuthLayout>
    );
  }

  return <></>;
};

export default Page;
