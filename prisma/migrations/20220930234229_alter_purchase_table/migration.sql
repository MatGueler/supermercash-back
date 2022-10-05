/*
  Warnings:

  - You are about to drop the column `productsMarketsId` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `productId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_productsMarketsId_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "productsMarketsId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
