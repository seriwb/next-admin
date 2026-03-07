"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { AccountSummary } from "@/app/api/admin/accounts/route";
import { Pagination } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PER_PAGE } from "@/constants/application";
import { useNavigationRouter } from "@/hooks/use-navigation-progress";
import dayjs from "@/lib/utils/date";
import { AccountSearch } from "./account-search";
import { deleteAccountAction } from "./actions";
import { DeleteAccountDialog } from "./delete-account-dialog";

type Props = {
  data: AccountSummary[];
  total: number;
  page: number;
  query: string;
  sort: string;
  currentUserId: string;
};

const getPrivilegeBadgeVariant = (privilege: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (privilege) {
    case "Owner":
      return "destructive";
    case "Admin":
      return "default";
    default:
      return "secondary";
  }
};

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "active":
      return "default";
    case "suspended":
      return "destructive";
    default:
      return "secondary";
  }
};

export const AccountList = ({ data, total, page, query, sort, currentUserId }: Props) => {
  const router = useRouter();
  const { push } = useNavigationRouter();
  const [deleteTarget, setDeleteTarget] = useState<AccountSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage + 1));
    if (query) params.set("query", query);
    if (sort) params.set("sort", sort);
    push(`/system/accounts?${params.toString()}`);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const result = await deleteAccountAction(deleteTarget.id);
      if (result.success) {
        toast.success("アカウントを削除しました");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(result.error || "削除に失敗しました");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <AccountSearch query={query} sort={sort} />
        <Link href="/system/accounts/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>メールアドレス / 名前</TableHead>
              <TableHead>権限</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>作成日時</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  アカウントがありません
                </TableCell>
              </TableRow>
            ) : (
              data.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <Link href={`/system/accounts/${account.id}/edit`} className="font-medium hover:underline">
                      {account.email}
                    </Link>
                    {account.name && <p className="text-sm text-muted-foreground">{account.name}</p>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPrivilegeBadgeVariant(account.privilege)}>{account.privilege}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(account.status)}>{account.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {dayjs(account.createdAt).tz().format("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell>
                    {account.id !== currentUserId && (
                      <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(account)}>
                        削除
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {total > PER_PAGE && (
        <Pagination page={page - 1} totalNumber={total} perPage={PER_PAGE} onPaging={handlePageChange} />
      )}

      <DeleteAccountDialog
        account={deleteTarget}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
