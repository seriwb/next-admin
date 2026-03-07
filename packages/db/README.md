# DB

データベース管理パッケージ (`@next-admin/db`)

## セットアップ手順

### 1. 環境変数の設定

`.env.template` を元に `.env` を作成する。

```bash
cp .env.template .env
```

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
