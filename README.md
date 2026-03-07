# next-admin

Next.jsを使用した管理画面アプリケーションのテンプレートプロジェクトで、  
Yarn Workspacesによるモノレポ構成になっています。

## Base Libraries

- Next.js 16
- Better Auth 1.4
- TailwindCSS 7
- prisma 4
- yarn 4

### Infrastructures

- docker compose
- PostgreSQL 18
- oven(SES)


## リポジトリ構成

```
next-admin/
├── apps/
│   ├── admin/          # 管理画面アプリケーション (Next.js)
│   └── web/            # サービスアプリケーション用フレイスホルダー
├── packages/
│   └── db/             # マイグレーション管理 (Prisma)
├── infra/              # インフラ設定
└── docker-compose.yml  # ローカル開発用インフラ管理
```
