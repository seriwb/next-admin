import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return children;
}
