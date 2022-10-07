-- CreateTable
CREATE TABLE "supermarkets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "supermarkets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supermarkets_name_key" ON "supermarkets"("name");
