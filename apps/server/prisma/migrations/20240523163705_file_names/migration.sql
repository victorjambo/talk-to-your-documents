/*
  Warnings:

  - You are about to drop the column `bookName` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "bookName",
ADD COLUMN     "fileNames" TEXT[] DEFAULT ARRAY[]::TEXT[];
