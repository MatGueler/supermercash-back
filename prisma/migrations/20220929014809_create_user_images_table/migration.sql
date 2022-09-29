-- CreateTable
CREATE TABLE "userImages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "urlImage" TEXT NOT NULL,

    CONSTRAINT "userImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userImages_userId_key" ON "userImages"("userId");

-- AddForeignKey
ALTER TABLE "userImages" ADD CONSTRAINT "userImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
