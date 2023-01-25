/*
  Warnings:

  - You are about to drop the column `carbohydrates` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `lipids` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `meals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `meals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `period` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `users_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "carbohydrates",
DROP COLUMN "lipids",
DROP COLUMN "proteins",
ADD COLUMN     "period" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_data" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "meals_id_key" ON "meals"("id");
