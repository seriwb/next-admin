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
  const activated = session?.user.status === 'active';

  useEffect(() => {
    if ((!loading && !session) || (session && !activated)) {
      if (typeof window !== 'undefined') {
        router.push('/');
      }
    }
  }, [loading, session, router, activated]);

  if (loading || !session || !activated) {
    return <></>;
  }

  return <>{props.children}</>;
};
