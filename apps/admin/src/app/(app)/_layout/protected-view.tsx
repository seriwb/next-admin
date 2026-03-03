"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNT_STATUS } from "@/constants/application";
import { useSession } from "@/lib/auth-client";

type Props = {
  children: React.ReactNode;
};

export const ProtectedView = (props: Props) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const activated = session?.user?.status === ACCOUNT_STATUS.active;

  useEffect(() => {
    if ((!isPending && !session) || (session && !activated)) {
      if (typeof window !== "undefined") {
        router.push("/");
      }
    }
  }, [isPending, session, router, activated]);

  if (isPending || !session || !activated) {
    return <></>;
  }

  return <>{props.children}</>;
};
