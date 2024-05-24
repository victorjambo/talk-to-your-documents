/*
  Warnings:

  - You are about to drop the `chat_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "chat_history";

-- CreateTable
CREATE TABLE "conversations" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "message" JSONB NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);
