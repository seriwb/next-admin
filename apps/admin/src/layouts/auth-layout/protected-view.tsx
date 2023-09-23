import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export const ProtectedView = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const isUser = !!session?.user;
  const activated = session?.user.status === 'active';

  useEffect(() => {
    if (isUser && activated) {
      router.push('/');
    }
  }, [isUser, activated, router]);

  if (loading) {
    return <></>;
  }

  return <>{((isUser && !activated) || !isUser) && props.children}</>;
};
