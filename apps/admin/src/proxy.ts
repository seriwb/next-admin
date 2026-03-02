import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // これらのパスにマッチしない場合、認証チェックを行う
    // CAUTION: 動的生成した文字列では意図通りに動作しない
    "/((?!firstuser|signin|api/healthcheck|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
