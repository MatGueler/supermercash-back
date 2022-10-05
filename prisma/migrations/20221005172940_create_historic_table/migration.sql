-- CreateTable
CREATE TABLE "hisoric" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantifyProducts" INTEGER NOT NULL,
    "purchaseValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "hisoric_pkey" PRIMARY KEY ("id")
);
