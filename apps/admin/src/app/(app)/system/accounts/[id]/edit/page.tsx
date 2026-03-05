import { notFound } from "next/navigation";
import { getAppSession } from "@/lib/auth";
import { getAccountAction } from "./_parts/actions";
import { EditAccount } from "./_parts/edit-account";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditAccountPage({ params }: Props) {
  const { id } = await params;
  const [session, result] = await Promise.all([getAppSession(), getAccountAction(id)]);

  if (!result.success || !result.data) {
    notFound();
  }

  const currentUserId = session?.user.id ?? "";

  return <EditAccount account={result.data} currentUserId={currentUserId} />;
}
