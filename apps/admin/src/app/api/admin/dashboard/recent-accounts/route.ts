import { NextResponse } from "next/server";
import { getAppSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import dayjs from "@/lib/utils/date";

export const dynamic = "force-dynamic";

// GET: 今月作成されたアカウント一覧取得
export async function GET() {
  const session = await getAppSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

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

    return NextResponse.json({ success: true, data: accounts });
  } catch (error) {
    console.error("Recent accounts GET API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
