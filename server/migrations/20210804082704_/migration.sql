-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD FOREIGN KEY ("parentId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
