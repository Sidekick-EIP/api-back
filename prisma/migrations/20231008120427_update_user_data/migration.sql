/*
  Warnings:

  - You are about to drop the column `sport_frequence` on the `users_data` table. All the data in the column will be lost.
  - You are about to drop the column `sports` on the `users_data` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users_data` table. All the data in the column will be lost.
  - Added the required column `hobbies` to the `users_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `users_data` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'IRREGULAR_TRAINING', 'MEDIUM', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Hobbies" AS ENUM ('TEST');

-- DropIndex
DROP INDEX "users_data_username_key";

-- AlterTable
ALTER TABLE "users_data" DROP COLUMN "sport_frequence",
DROP COLUMN "sports",
DROP COLUMN "username",
ADD COLUMN     "hobbies" "Hobbies" NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL;

-- DropEnum
DROP TYPE "SportFrequence";
