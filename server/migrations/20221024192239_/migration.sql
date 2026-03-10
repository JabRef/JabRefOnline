/*
  Warnings:

  - You are about to drop the column `author` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `editor` on the `UserDocument` table. All the data in the column will be lost.
  - You are about to drop the column `translators` on the `UserDocument` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('PERSON', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "ContributorRole" AS ENUM ('AUTHOR', 'EDITOR', 'TRANSLATOR');

-- AlterTable
ALTER TABLE "UserDocument" DROP COLUMN "author",
DROP COLUMN "editor",
DROP COLUMN "translators";

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL,
    "type" "EntityType" NOT NULL,
    "name" TEXT,
    "family" TEXT,
    "given" TEXT,
    "suffix" TEXT,
    "nonDroppingParticle" TEXT,
    "droppingParticle" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentContributor" (
    "documentId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "role" "ContributorRole" NOT NULL,

    CONSTRAINT "DocumentContributor_pkey" PRIMARY KEY ("documentId","authorId")
);

-- AddForeignKey
ALTER TABLE "DocumentContributor" ADD CONSTRAINT "DocumentContributor_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "UserDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentContributor" ADD CONSTRAINT "DocumentContributor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
