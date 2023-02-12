/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users_data` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users_data" ALTER COLUMN "username" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_data_username_key" ON "users_data"("username");
