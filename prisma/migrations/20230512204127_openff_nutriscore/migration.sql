/*
  Warnings:

  - Added the required column `nutriscore` to the `open_food_facts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "open_food_facts" ADD COLUMN     "nutriscore" TEXT NOT NULL;
