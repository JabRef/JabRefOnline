/*
  Warnings:

  - You are about to drop the column `other` on the `UserDocument` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hierarchyType` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isExpanded` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupHierarchyType" AS ENUM ('INDEPENDENT', 'INTERSECTION', 'UNION');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('AutomaticKeywordGroup', 'AutomaticPersonsGroup', 'ExplicitGroup', 'LastNameGroup', 'WordKeywordGroup', 'RegexKeywordGroup', 'SearchGroup', 'TexGroup');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "hierarchyType" "GroupHierarchyType" NOT NULL,
ADD COLUMN     "isExpanded" BOOLEAN NOT NULL,
ADD COLUMN     "type" "GroupType" NOT NULL,
ADD COLUMN     "field" TEXT,
ADD COLUMN     "keywordDelimiter" TEXT,
ADD COLUMN     "keywordHierarchicalDelimiter" TEXT,
ADD COLUMN     "authorLastName" TEXT,
ADD COLUMN     "searchExpression" TEXT,
ADD COLUMN     "caseSensitive" BOOLEAN,
ADD COLUMN     "onlySplitWordsAtDelimiter" BOOLEAN,
ADD COLUMN     "isRegEx" BOOLEAN;

-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "other";

-- CreateTable
CREATE TABLE "UserDocumentOtherField" (
    "documentId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("documentId","field")
);

-- AddForeignKey
ALTER TABLE "UserDocumentOtherField" ADD FOREIGN KEY ("documentId") REFERENCES "UserDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
