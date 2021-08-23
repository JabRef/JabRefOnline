/*
  Warnings:

  - The `keywords` column on the `UserDocument` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "keywords",
ADD COLUMN     "keywords" TEXT[];
