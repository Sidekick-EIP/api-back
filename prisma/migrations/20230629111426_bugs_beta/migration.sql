-- CreateEnum
CREATE TYPE "Page" AS ENUM ('NUTRITION', 'MESSAGE', 'HOME', 'SETTINGS', 'PROFILE', 'SIGNUP', 'LOGIN');

-- CreateTable
CREATE TABLE "bugs_beta" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "page" "Page" NOT NULL,

    CONSTRAINT "bugs_beta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bugs_beta_id_key" ON "bugs_beta"("id");

-- AddForeignKey
ALTER TABLE "bugs_beta" ADD CONSTRAINT "bugs_beta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
