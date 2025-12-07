import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts",
};

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
