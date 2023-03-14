/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_data" DROP COLUMN "birthDate",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "goal" SET DEFAULT '',
ALTER COLUMN "sports" SET DEFAULT '{}';
