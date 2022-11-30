/*
  Warnings:

  - You are about to drop the column `balanced` on the `meals` table. All the data in the column will be lost.
  - Added the required column `carbohydrates` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lipids` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteins` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "balanced",
ADD COLUMN     "carbohydrates" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lipids" INTEGER NOT NULL,
ADD COLUMN     "proteins" INTEGER NOT NULL;
