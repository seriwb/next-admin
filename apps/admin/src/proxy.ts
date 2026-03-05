import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    if (request.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL("/signin?code=E401", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/dashboard/:path*", "/system/:path*", "/signout/:path*"],
};
