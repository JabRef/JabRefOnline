/*
  Warnings:

  - You are about to drop the column `date` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `UserDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "date",
DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "publishedAt" TEXT;
