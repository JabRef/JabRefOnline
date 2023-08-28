/*
  Warnings:

  - The `issn` column on the `Journal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `isCustom` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "areas" TEXT[],
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "country" TEXT,
ADD COLUMN     "hIndex" INTEGER,
ADD COLUMN     "isCustom" BOOLEAN NOT NULL,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "scimagoId" INTEGER,
DROP COLUMN "issn",
ADD COLUMN     "issn" INTEGER[];

-- CreateTable
CREATE TABLE "JournalCitationInfoYearly" (
    "journalId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "docsThisYear" INTEGER NOT NULL,
    "docsPrevious3Years" INTEGER NOT NULL,
    "citableDocsPrevious3Years" INTEGER NOT NULL,
    "citesOutgoing" INTEGER NOT NULL,
    "citesOutgoingPerDoc" DOUBLE PRECISION NOT NULL,
    "citesIncomingByRecentlyPublished" INTEGER NOT NULL,
    "citesIncomingPerDocByRecentlyPublished" DOUBLE PRECISION NOT NULL,
    "sjrIndex" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "JournalCitationInfoYearly_pkey" PRIMARY KEY ("journalId","year")
);

-- AddForeignKey
ALTER TABLE "JournalCitationInfoYearly" ADD CONSTRAINT "JournalCitationInfoYearly_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
