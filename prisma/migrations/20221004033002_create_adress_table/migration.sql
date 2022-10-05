-- CreateTable
CREATE TABLE "userAdress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "adress" TEXT NOT NULL,

    CONSTRAINT "userAdress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAdress_userId_key" ON "userAdress"("userId");

-- AddForeignKey
ALTER TABLE "userAdress" ADD CONSTRAINT "userAdress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
