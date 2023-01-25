/*
  Warnings:

  - You are about to drop the column `carbohydrates` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `lipids` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `meals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `meals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "carbohydrates",
DROP COLUMN "lipids",
DROP COLUMN "proteins",
ADD COLUMN     "period" TEXT NOT NULL DEFAULT 'dinner';

-- AlterTable
ALTER TABLE "users_data" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "meals_id_key" ON "meals"("id");
