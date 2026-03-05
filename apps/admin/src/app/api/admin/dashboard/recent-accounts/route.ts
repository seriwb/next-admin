import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dayjs from "@/lib/utils/date";
import type { ServerResult } from "@/types/app";
import type { AccountSummary } from "../../accounts/route";

export const dynamic = "force-dynamic";

export type DashboardAccountSummary = AccountSummary;

// GET: 今月作成されたアカウント一覧取得
export async function GET() {
  try {
    const startOfMonth = dayjs().tz().startOf("month").toDate();

    const accounts = await prisma.account.findMany({
      where: {
        createdAt: { gte: startOfMonth },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        privilege: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json<ServerResult<DashboardAccountSummary[]>>({ success: true, data: accounts });
  } catch (error) {
    console.error("Recent accounts GET API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
