import { Suspense } from "react";
import type { Metadata } from "next";
import { SignIn } from "./_components/signin";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SigninPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
