# DB

データベース管理パッケージ (`@next-admin/db`)。Prisma 7 を使用。

## セットアップ手順

### 1. 環境変数の設定

`.env.template` を元に `.env` を作成する。

```bash
cp .env.template .env
```

主な設定項目:

| 変数                | デフォルト値     | 説明             |
| ------------------- | ---------------- | ---------------- |
| `DATABASE_HOST`     | `localhost`      | DBホスト         |
| `DATABASE_PORT`     | `55432`          | DBポート         |
| `DATABASE_USERNAME` | `admin`          | DBユーザー       |
| `DATABASE_PASSWORD` | `admin`          | DBパスワード     |
| `DATABASE_NAME`     | `next_admin`     | DB名             |
| `DATABASE_URL`      | （上記から構成） | Prisma接続文字列 |

### 2. Prisma クライアント生成

```bash
yarn db:generate
```

### 3. マイグレーション実行

```bash
yarn db:deploy
```

## データベース接続

```bash
psql postgresql://admin:admin@127.0.0.1:55432/next_admin
```
