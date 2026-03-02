"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { AuthLayout } from "./(auth)/_layout";
import SigninPage from "./(auth)/signin/page";

const DEFAULT_VIEW = "/dashboard";

const Page = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const isUser = !!session?.user;
  const activated = session?.user?.status === "active";

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
        <SigninPage />
      </AuthLayout>
    );
  }

  return <></>;
};

export default Page;
