import { notFound } from "next/navigation";
import { EditAccount } from "./_components/edit-account";
import { getAccountAction } from "./_lib/actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditAccountPage({ params }: Props) {
  const { id } = await params;
  const result = await getAccountAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <EditAccount account={result.data} />;
}
