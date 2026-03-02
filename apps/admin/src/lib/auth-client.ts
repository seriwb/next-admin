import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";

/**
 * Better Auth クライアント設定
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_HOST || "http://localhost:3500",
  plugins: [customSessionClient<typeof auth>()],
});

// エクスポート
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
