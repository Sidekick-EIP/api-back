/*
  Warnings:

  - You are about to alter the column `met` on the `exercises_library` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "exercises_library" ALTER COLUMN "met" SET DATA TYPE INTEGER;
