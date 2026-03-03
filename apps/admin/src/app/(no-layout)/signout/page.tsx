"use client";

import { useEffect } from "react";
import { signOut } from "@/lib/auth-client";

export default function SignOutPage() {
  useEffect(() => {
    (async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/signin?code=SignOut";
          },
        },
      });
    })();
  }, []);

  return null;
}
