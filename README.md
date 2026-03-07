# next-admin

Next.js 16 (App Router) を使用した管理画面アプリケーションテンプレート。Yarn Workspaces によるモノレポ構成。

## 技術スタック

| カテゴリ             | 技術                                  |
| -------------------- | ------------------------------------- |
| フレームワーク       | Next.js 16 (App Router)               |
| 認証                 | Better Auth 1.4                       |
| データベース         | PostgreSQL 18 / Prisma 7              |
| UI                   | Tailwind CSS 4 / shadcn/ui / Radix UI |
| フォーム             | React Hook Form + Zod                 |
| メール               | AWS SES / React Email                 |
| パッケージマネージャ | Yarn 4                                |

## リポジトリ構成

```
next-admin/
├── apps/
│   └── admin/              # 管理画面アプリケーション (Next.js)
├── packages/
│   └── db/                 # データベースパッケージ (Prisma)
├── infra/                  # インフラ設定 (PostgreSQL初期化SQLなど)
├── docker-containers/      # Docker関連設定
├── docker-compose.yml      # ローカル開発用インフラ (PostgreSQL, SES)
└── docs/                   # ドキュメント
```

## インフラ構成 (docker-compose)

| サービス      | ポート | 用途                                         |
| ------------- | ------ | -------------------------------------------- |
| PostgreSQL 18 | 55432  | データベース (user: admin / password: admin) |
| SES Local     | 58005  | メール送信エミュレーション                   |
