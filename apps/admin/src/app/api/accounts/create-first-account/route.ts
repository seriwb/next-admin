import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCOUNT_PRIVILEGE } from "@/constants/application";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const total = await prisma.account.count({ where: { status: "active" } });
    if (total > 0) {
      return NextResponse.json({ success: false, error: "Active account already exists" }, { status: 400 });
    }

    const body = (await request.json()) as { email: string; password: string };
    const data = await auth.api.signUpEmail({
      body: {
        name: "First Admin",
        email: body.email,
        password: body.password,
        image: "https://example.com/image.png",
        privilege: ACCOUNT_PRIVILEGE.owner,
      },
    });

    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    console.error("Create first account API error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
