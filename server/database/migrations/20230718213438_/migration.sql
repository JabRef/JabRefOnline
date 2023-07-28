/*
  Warnings:

  - A unique constraint covering the columns `[scimagoId]` on the table `Journal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Journal_scimagoId_key" ON "Journal"("scimagoId");
