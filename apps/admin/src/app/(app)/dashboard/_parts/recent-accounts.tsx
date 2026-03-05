import Link from "next/link";
import type { DashboardAccountSummary } from "@/app/api/admin/dashboard/recent-accounts/route";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dayjs from "@/lib/utils/date";

type Props = {
  accounts: DashboardAccountSummary[];
  totalCount: number;
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

export const RecentAccounts = ({ accounts, totalCount }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>今月追加されたメンバー</CardTitle>
          <Badge variant="secondary">{totalCount}人</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <p className="text-sm text-muted-foreground">今月追加されたメンバーはいません</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>メールアドレス / 名前</TableHead>
                <TableHead>権限</TableHead>
                <TableHead>追加日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
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
                  <TableCell className="text-sm text-muted-foreground">
                    {dayjs(account.createdAt).tz().format("YYYY/MM/DD")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
