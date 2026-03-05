import { PER_PAGE } from "@/constants/application";
import { AccountList } from "./_parts/account-list";
import { getAccountListAction } from "./_parts/actions";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ page?: string; query?: string; sort?: string }>;
};

export default async function AccountsPage({ searchParams }: Props) {
  const params = await searchParams;
  const parsed = parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(parsed) ? Math.max(1, parsed) : 1;
  const query = params.query ?? "";
  const sort = params.sort ?? "desc";

  const result = await getAccountListAction({ page, perPage: PER_PAGE, query, sort });
  const data = result.success ? (result.data?.rows ?? []) : [];
  const total = result.success ? (result.data?.total ?? 0) : 0;

  return <AccountList data={data} total={total} page={page} query={query} sort={sort} />;
}
