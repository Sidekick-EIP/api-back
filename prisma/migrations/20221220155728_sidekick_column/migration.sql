/*
  Warnings:

  - A unique constraint covering the columns `[sidekick_id]` on the table `users_data` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users_data" ADD COLUMN     "sidekick_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_data_sidekick_id_key" ON "users_data"("sidekick_id");

-- AddForeignKey
ALTER TABLE "users_data" ADD CONSTRAINT "users_data_sidekick_id_fkey" FOREIGN KEY ("sidekick_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
