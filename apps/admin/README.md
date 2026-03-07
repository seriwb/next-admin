# Admin

Next.jsを使用した管理画面アプリケーション

## セットアップ手順

### 1. インフラの起動

プロジェクトルートでDockerコンテナを起動する。

```bash
docker compose up -d
```

### 2. Node.js のインストール

`.node-version`に記載のバージョンを使用する。

```bash
cat .node-version | nodenv install
```

### 3. 依存パッケージのインストール

プロジェクトルートで実行する。

```bash
yarn
```

### 4. 環境変数の設定

`.env.template` を元に `.env.local` を作成し、必要な値を設定する。

```bash
cp .env.template .env.local
```

主な設定項目:
- `BETTER_AUTH_SECRET` - 認証用シークレットキー（要生成）
- `JWT_SECRET` - JWT署名用キー（要生成）
- AWS関連 - ローカル開発ではデフォルト値で動作

`packages/db` の環境変数も `.env.local` に含める（テンプレート内のコメント参照）。

### 5. データベースのセットアップ

```bash
# Prisma クライアント生成
yarn db:generate

# マイグレーション実行
yarn db:deploy
```

### 6. 開発サーバーの起動

```bash
# ルートからの場合
yarn admin:dev

# apps/adminからの場合
yarn dev
```

- http://localhost:3500/

### 7. 初回アカウントの作成

ブラウザで以下にアクセスし、最初の管理者アカウントを作成する。

- http://localhost:3500/firstuser


## 開発用Tips

### メールの受信確認

ローカル環境で送信したメールは、実際のアドレスには送信されません。  
内容は以下のURLで確認することができます。

- http://localhost:58005/
