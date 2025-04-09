-- AlterTable
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupToUser_AB_unique";

-- AlterTable
ALTER TABLE "_GroupToUserDocument" ADD CONSTRAINT "_GroupToUserDocument_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupToUserDocument_AB_unique";

-- AlterTable
ALTER TABLE "_UserToUserDocument" ADD CONSTRAINT "_UserToUserDocument_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserToUserDocument_AB_unique";
