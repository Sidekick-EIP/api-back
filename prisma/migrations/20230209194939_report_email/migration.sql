/*
  Warnings:

  - You are about to drop the column `reporterId` on the `reports` table. All the data in the column will be lost.
  - Added the required column `reporterEmail` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reports" DROP COLUMN "reporterId",
ADD COLUMN     "reporterEmail" TEXT NOT NULL;
