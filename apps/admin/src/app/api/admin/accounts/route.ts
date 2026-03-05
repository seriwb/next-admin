import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PER_PAGE } from "@/constants/application";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: アカウント一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const perPage = Math.max(1, parseInt(searchParams.get("perPage") ?? String(PER_PAGE), 10));
    const query = searchParams.get("query") ?? "";
    const sort = searchParams.get("sort") ?? "desc";

    const where = query
      ? {
          OR: [{ email: { contains: query } }, { name: { contains: query } }],
        }
      : {};

    const [rows, total] = await Promise.all([
      prisma.account.findMany({
        where,
        orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          email: true,
          name: true,
          privilege: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.account.count({ where }),
    ]);

    return NextResponse.json({ success: true, data: { rows, total } });
  } catch (error) {
    console.error("Accounts GET API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: アカウント新規作成
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email: string;
      password: string;
      name?: string;
      privilege: string;
    };

    await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name || "",
        privilege: body.privilege,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Accounts POST API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
