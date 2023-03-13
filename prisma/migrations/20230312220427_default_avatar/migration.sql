/*
  Warnings:

  - Made the column `avatar` on table `users_data` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users_data" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'https://sidekick-files.s3.eu-west-3.amazonaws.com/default.jpg';
