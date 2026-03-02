import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const total = await prisma.account.count({ where: { status: "active" } });
    return NextResponse.json({ success: true, data: total > 0 });
  } catch (error) {
    console.error("Check active account existence API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
