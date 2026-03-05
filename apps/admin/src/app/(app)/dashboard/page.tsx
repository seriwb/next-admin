import { getRecentAccountsAction } from "./_parts/actions";
import { RecentAccounts } from "./_parts/recent-accounts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const result = await getRecentAccountsAction();
  const accounts = result.success ? (result.data?.accounts ?? []) : [];
  const totalCount = result.success ? (result.data?.totalCount ?? 0) : 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      <RecentAccounts accounts={accounts} totalCount={totalCount} />
    </div>
  );
}
