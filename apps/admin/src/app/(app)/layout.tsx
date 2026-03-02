import React from "react";
import { AppLayout as Layout } from "./_layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
