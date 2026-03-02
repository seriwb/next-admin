"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNT_STATUS, DEFAULT_VIEW } from "@/constants/application";
import { useSession } from "@/lib/auth-client";
import { AuthLayout } from "./(auth)/_layout/auth-layout";
import { SignIn } from "./(auth)/signin/_components/signin";

const Page = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const isUser = !!session?.user;
  const activated = session?.user?.status === ACCOUNT_STATUS.active;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isUser) {
      router.push(DEFAULT_VIEW);
    }
  }, [isPending, isUser, router]);

  if (isPending) {
    return <></>;
  }

  if (!isUser || !activated) {
    return (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    );
  }

  return <></>;
};

export default Page;
