/*
  Warnings:

  - The `activities` column on the `users_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `goal_weight` to the `users_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_data" ADD COLUMN     "goal_weight" INTEGER NOT NULL,
DROP COLUMN "activities",
ADD COLUMN     "activities" "Activities"[];
