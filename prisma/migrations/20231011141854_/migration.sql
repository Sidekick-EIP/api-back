/*
  Warnings:

  - You are about to drop the column `lipids` on the `nutrition` table. All the data in the column will be lost.
  - Added the required column `carbs` to the `nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nutrition" DROP COLUMN "lipids",
ADD COLUMN     "carbs" INTEGER NOT NULL;
