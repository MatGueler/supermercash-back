-- CreateTable
CREATE TABLE "productsMarkets" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "supermarketId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "productsMarkets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productsMarkets" ADD CONSTRAINT "productsMarkets_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsMarkets" ADD CONSTRAINT "productsMarkets_supermarketId_fkey" FOREIGN KEY ("supermarketId") REFERENCES "supermarkets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
