import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: アカウント詳細取得
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const account = await prisma.account.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        privilege: true,
        status: true,
        caution: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!account) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: account });
  } catch (error) {
    console.error("Account GET API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: アカウント更新
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as {
      name?: string;
      privilege: string;
      status: string;
      caution?: string;
    };

    await prisma.account.update({
      where: { id },
      data: {
        name: body.name || null,
        privilege: body.privilege,
        status: body.status,
        caution: body.caution || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Account PUT API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: アカウント削除（BaSession, BaAccount はCascadeで自動削除）
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.account.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Account DELETE API error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
