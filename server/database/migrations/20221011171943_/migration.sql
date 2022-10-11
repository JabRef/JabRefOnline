/*
  Warnings:

  - A unique constraint covering the columns `[id,lastModified]` on the table `UserDocument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `revisionHash` to the `UserDocument` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastModified` on table `UserDocument` required. This step will fail if there are existing NULL values in that column.
  - Made the column `added` on table `UserDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserDocument" ADD COLUMN     "revisionHash" TEXT NOT NULL,
ADD COLUMN     "revisionNumber" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "lastModified" SET NOT NULL,
ALTER COLUMN "lastModified" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "added" SET NOT NULL,
ALTER COLUMN "added" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "UserDocument_id_lastModified_key" ON "UserDocument"("id", "lastModified");
