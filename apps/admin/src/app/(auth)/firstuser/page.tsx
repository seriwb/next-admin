import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/link";
import { FirstUser } from "./_components/first-user";
import { checkActiveAccountExist } from "./_lib/actions";

export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "管理アカウント登録",
};

export default async function FirstUserPage() {
  const result = await checkActiveAccountExist();

  if (!result.success) {
    notFound();
  }
  return !result.data ? (
    <FirstUser />
  ) : (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>User already exist.</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
