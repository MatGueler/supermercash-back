-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "productsMarketsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productsMarketsId_fkey" FOREIGN KEY ("productsMarketsId") REFERENCES "productsMarkets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
