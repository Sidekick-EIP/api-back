/*
  Warnings:

  - Added the required column `description` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport_frequence` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "SportFrequence" AS ENUM ('NEVER', 'LESS_THAN_ONCE_A_MONTH', 'ONCE_A_MONTH', 'ONCE_IN_TWO_WEEKS', 'ONCE_A_WEEK', 'TWICE_A_WEEK', 'THREE_A_WEEK', 'FOUR_A_WEEK', 'FIVE_A_WEEK', 'MORE_THEN_FIVE_A_WEEK');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "sport_frequence" "SportFrequence" NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;
