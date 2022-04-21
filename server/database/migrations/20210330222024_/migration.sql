-- CreateTable
CREATE TABLE "UserDocument" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "citationKey" TEXT,
    "lastModified" TIMESTAMP(3),
    "added" TIMESTAMP(3),
    "author" TEXT,
    "editor" TEXT,
    "title" TEXT,
    "journal" TEXT,
    "journaltitle" TEXT,
    "booktitle" TEXT,
    "date" TEXT,
    "year" TEXT,
    "month" TEXT,
    "number" TEXT,
    "volume" TEXT,
    "edition" TEXT,
    "series" TEXT,
    "pages" TEXT,
    "pagetotal" TEXT,
    "issue" TEXT,
    "note" TEXT,
    "url" TEXT,
    "urldate" TEXT,
    "publisher" TEXT,
    "abstract" TEXT,
    "keywords" TEXT,
    "groups" TEXT,
    "priority" TEXT,
    "doi" TEXT,
    "eprint" TEXT,
    "eprintclass" TEXT,
    "eprinttype" TEXT,
    "issn" TEXT,
    "isbn" TEXT,
    "other" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToUserDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserDocument_AB_unique" ON "_UserToUserDocument"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserDocument_B_index" ON "_UserToUserDocument"("B");

-- AddForeignKey
ALTER TABLE "_UserToUserDocument" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserDocument" ADD FOREIGN KEY ("B") REFERENCES "UserDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
