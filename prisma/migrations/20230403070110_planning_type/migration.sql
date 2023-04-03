/*
  Warnings:

  - Added the required column `type` to the `planning` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventCalendar" AS ENUM ('MEAL', 'SPORTS_EXERCISE');

-- AlterTable
ALTER TABLE "planning" ADD COLUMN     "type" "EventCalendar" NOT NULL;
