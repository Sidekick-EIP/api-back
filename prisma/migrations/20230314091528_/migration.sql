/*
  Warnings:

  - Added the required column `goal` to the `users_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sports` to the `users_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_data" ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "sports" JSONB NOT NULL;
