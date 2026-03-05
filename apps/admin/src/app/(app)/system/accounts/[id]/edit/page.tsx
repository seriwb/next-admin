import { notFound } from "next/navigation";
import { getAccountAction } from "./_parts/actions";
import { EditAccount } from "./_parts/edit-account";

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
