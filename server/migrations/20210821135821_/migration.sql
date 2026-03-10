/*
  Warnings:

  - You are about to drop the column `pages` on the `UserDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "pages",
ADD COLUMN     "pageEnd" TEXT,
ADD COLUMN     "pageStart" TEXT;
