import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dayjs from "@/lib/utils/date";
import type { ServerResult } from "@/types/app";
import type { AccountSummary } from "../../accounts/route";

export const dynamic = "force-dynamic";

export type DashboardAccountSummary = AccountSummary;

export type RecentAccountsResponse = {
  accounts: DashboardAccountSummary[];
  totalCount: number;
};

// GET: 今月作成されたアカウント一覧取得（最新10件）と総数
export async function GET() {
  try {
    const startOfMonth = dayjs().tz().startOf("month").toDate();

    const [accounts, totalCount] = await Promise.all([
      prisma.account.findMany({
        where: { createdAt: { gte: startOfMonth } },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          email: true,
          name: true,
          privilege: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.account.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
    ]);

    return NextResponse.json<ServerResult<RecentAccountsResponse>>({ success: true, data: { accounts, totalCount } });
  } catch (error) {
    console.error("Recent accounts GET API error:", error);
    return NextResponse.json<ServerResult>({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
