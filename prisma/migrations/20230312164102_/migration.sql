/*
  Warnings:

  - The primary key for the `sports_exercices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `sports_exercices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `sports_exercices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sports_exercices" DROP CONSTRAINT "sports_exercices_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sports_exercices_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "sports_exercices_id_key" ON "sports_exercices"("id");
