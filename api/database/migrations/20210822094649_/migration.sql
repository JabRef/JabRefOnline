-- AlterTable
ALTER TABLE "UserDocument" ADD COLUMN     "electronicId" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "originalLanguages" TEXT[],
ADD COLUMN     "publicationState" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "titleAddon" TEXT,
ADD COLUMN     "translators" TEXT[];
