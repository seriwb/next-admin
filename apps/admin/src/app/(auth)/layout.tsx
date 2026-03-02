import React from "react";
import { AuthLayout as Layout } from "./_layout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
