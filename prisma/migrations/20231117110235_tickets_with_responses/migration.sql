/*
  Warnings:

  - You are about to drop the column `answer` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `last_action` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketAction" AS ENUM ('OPENED_BY_USER', 'ANSWERED_BY_MODERATOR', 'ANSWERED_BY_USER');

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "answer",
ADD COLUMN     "last_action" "TicketAction" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "responses" (
    "ticketId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "responses_ticketId_key" ON "responses"("ticketId");

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
