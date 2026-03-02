-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "privilege" TEXT NOT NULL,
    "caution" TEXT,
    "name" TEXT,
    "image" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "caution" TEXT,
    "name" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "published_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ba_session" (
    "id" TEXT NOT NULL,
    "expires_at" TIMESTAMP NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "ba_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ba_account" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "access_token_expires_at" TIMESTAMP,
    "refresh_token_expires_at" TIMESTAMP,
    "scope" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "ba_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ba_verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "ba_verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "article_uuid_key" ON "article"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ba_session_token_key" ON "ba_session"("token");

-- CreateIndex
CREATE INDEX "ba_session_user_id_idx" ON "ba_session"("user_id");

-- CreateIndex
CREATE INDEX "ba_account_user_id_idx" ON "ba_account"("user_id");

-- AddForeignKey
ALTER TABLE "ba_session" ADD CONSTRAINT "ba_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ba_account" ADD CONSTRAINT "ba_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
