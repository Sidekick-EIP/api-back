/*
  Warnings:

  - Added the required column `met` to the `exercises_library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `burnedCalories` to the `workouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises_library" ADD COLUMN     "met" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "burnedCalories" INTEGER NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL;
