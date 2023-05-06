/*
  Warnings:

  - The `goal` column on the `users_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('WEIGHT_GAIN', 'WEIGHT_LOSS', 'GETTING_BACK_IN_SHAPE');

-- AlterTable
ALTER TABLE "users_data" DROP COLUMN "goal",
ADD COLUMN     "goal" "Goal";
