/*
  Warnings:

  - You are about to drop the column `issn` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `issue` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `journal` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `journaltitle` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `volume` on the `UserDocument` table. All the data in the column will be lost.
  - Changed the type of `type` on the `UserDocument` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('JOURNAL_ARTICLE', 'PROCEEDINGS_ARTICLE', 'THESIS', 'OTHER');

-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "issn",
DROP COLUMN "issue",
DROP COLUMN "journal",
DROP COLUMN "journaltitle",
DROP COLUMN "number",
DROP COLUMN "series",
DROP COLUMN "volume",
ADD COLUMN     "journalIssueId" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "DocumentType" NOT NULL;

-- CreateTable
CREATE TABLE "JournalIssue" (
    "id" TEXT NOT NULL,
    "journalId" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "titleAddon" TEXT,
    "number" TEXT,
    "name" TEXT,
    "series" TEXT,
    "volume" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "titleAddon" TEXT,
    "issn" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserDocument" ADD FOREIGN KEY ("journalIssueId") REFERENCES "JournalIssue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalIssue" ADD FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
