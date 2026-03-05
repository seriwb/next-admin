import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/link";
import { checkActiveAccountExist } from "./_parts/actions";
import { FirstUser } from "./_parts/first-user";

export const dynamic = "force-dynamic";

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
