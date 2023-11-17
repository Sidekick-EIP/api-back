/*
  Warnings:

  - The primary key for the `responses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `responses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "responses_ticketId_key";

-- AlterTable
ALTER TABLE "responses" DROP CONSTRAINT "responses_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "responses_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "responses_id_key" ON "responses"("id");
