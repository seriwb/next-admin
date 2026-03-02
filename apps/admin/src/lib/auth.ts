import { headers } from "next/headers";
import { compare, hash } from "bcrypt";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";
import prisma from "@/lib/prisma";

// カスタムユーザー型
export type CustomUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  status: string;
  privilege: string;
  caution: string | null;
};

export type CustomSession = {
  user: CustomUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
};

const SALT_ROUNDS = 10;

/**
 * Better Auth サーバー設定
 * 既存のAccountテーブルをuserテーブルとして使用
 */
export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_HOST || "http://localhost:3500",
  secret: process.env.BETTER_AUTH_SECRET,

  // Prismaアダプター（カスタムテーブルマッピング）
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // 既存のAccountテーブルをuserとして使用
  user: {
    modelName: "Account",
    fields: {
      id: "id",
      email: "email",
      name: "name",
      image: "image",
      emailVerified: "emailVerified",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    additionalFields: {
      status: {
        type: "string",
        required: true,
        defaultValue: "active",
        returned: true,
      },
      privilege: {
        type: "string",
        required: true,
        defaultValue: "user",
        returned: true,
      },
      caution: {
        type: "string",
        required: false,
        returned: true,
      },
    },
  },

  // セッションテーブル
  session: {
    modelName: "BaSession",
    fields: {
      id: "id",
      userId: "userId",
      token: "token",
      expiresAt: "expiresAt",
      ipAddress: "ipAddress",
      userAgent: "userAgent",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    expiresIn: 60 * 60 * 24, // 1日
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5分
    },
  },

  // アカウントテーブル（OAuthプロバイダー用）
  account: {
    modelName: "BaAccount",
    fields: {
      id: "id",
      userId: "userId",
      accountId: "accountId",
      providerId: "providerId",
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      accessTokenExpiresAt: "accessTokenExpiresAt",
      refreshTokenExpiresAt: "refreshTokenExpiresAt",
      scope: "scope",
      password: "password",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },

  // 検証テーブル
  verification: {
    modelName: "BaVerification",
    fields: {
      id: "id",
      identifier: "identifier",
      value: "value",
      expiresAt: "expiresAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },

  // メール・パスワード認証を有効化
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
    maxPasswordLength: 128,
    // カスタムパスワードハッシュ（bcryptを使用）
    password: {
      hash: async (password) => {
        return hash(password, SALT_ROUNDS);
      },
      verify: async ({ password, hash: hashedPassword }) => {
        return compare(password, hashedPassword);
      },
    },
  },

  // 信頼するオリジン
  trustedOrigins: [process.env.NEXT_PUBLIC_HOST || "http://localhost:3500"],

  // 高度な設定
  advanced: {
    cookiePrefix: "admin",
    // IDはデータベースで自動生成（autoincrement）
    generateId: false,
  },

  // プラグイン
  plugins: [
    customSession(async ({ user, session }) => {
      // Accountテーブルからカスタムフィールドを取得
      const account = await prisma.account.findUnique({
        where: { id: user.id },
        select: {
          status: true,
          privilege: true,
          caution: true,
        },
      });

      return {
        user: {
          ...user,
          status: account?.status ?? "active",
          privilege: account?.privilege ?? "user",
          caution: account?.caution ?? null,
        },
        session,
      };
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;

/**
 * サーバーサイドでセッションを取得
 */
export const getAppSession = async (): Promise<CustomSession | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session as unknown as CustomSession;
};
