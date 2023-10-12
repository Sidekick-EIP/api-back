/*
  Warnings:

  - You are about to drop the `calories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planning` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Period" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS');

-- DropForeignKey
ALTER TABLE "calories" DROP CONSTRAINT "calories_userId_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- DropForeignKey
ALTER TABLE "planning" DROP CONSTRAINT "planning_userId_fkey";

-- DropTable
DROP TABLE "calories";

-- DropTable
DROP TABLE "meals";

-- DropTable
DROP TABLE "planning";

-- CreateTable
CREATE TABLE "nutrition" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "protein" INTEGER NOT NULL,
    "lipids" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "period" "Period" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_id_key" ON "nutrition"("id");

-- AddForeignKey
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
