/*
  Warnings:

  - You are about to drop the column `citationKey` on the `UserDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "citationKey",
ADD COLUMN     "citationKeys" TEXT[];
