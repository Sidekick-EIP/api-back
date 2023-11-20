/*
  Warnings:

  - Added the required column `answer` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "answer" TEXT NOT NULL;
