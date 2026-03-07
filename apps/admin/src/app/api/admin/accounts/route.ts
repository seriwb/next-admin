import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { APP_NAME, PER_PAGE } from "@/constants/application";
import { auth } from "@/lib/auth";
import { sendMail } from "@/lib/mail";
import { InviteEmail } from "@/lib/mail/templates/invite-email";
import prisma from "@/lib/prisma";
import type { ServerResult } from "@/types/app";

export const dynamic = "force-dynamic";

export type AccountSummary = {
  id: string;
  email: string;
  name: string | null;
  privilege: string;
  status: string;
  createdAt: Date;
};

// GET: アカウント一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedPage = parseInt(searchParams.get("page") ?? "1", 10);
    const page = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;
    const parsedPerPage = parseInt(searchParams.get("perPage") ?? String(PER_PAGE), 10);
    const perPage = Number.isFinite(parsedPerPage) ? Math.max(1, parsedPerPage) : PER_PAGE;
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

    return NextResponse.json<ServerResult<{ rows: AccountSummary[]; total: number }>>({
      success: true,
      data: { rows, total },
    });
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
      sendInvite?: boolean;
    };

    await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name || "",
        privilege: body.privilege,
      },
    });

    // 招待メール送信（失敗してもアカウント作成はブロックしない）
    if (body.sendInvite) {
      try {
        const loginUrl = `${process.env.NEXT_PUBLIC_HOST}/signin`;
        const html = await render(
          InviteEmail({
            name: body.name || "",
            email: body.email,
            password: body.password,
            loginUrl,
          })
        );
        await sendMail(body.email, `[${APP_NAME}] アカウントが作成されました`, html);
      } catch (mailError) {
        console.error("招待メール送信エラー:", mailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Accounts POST API error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
