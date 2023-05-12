/*
  Warnings:

  - You are about to drop the `OpenFoodFacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OpenFoodFacts";

-- CreateTable
CREATE TABLE "open_food_facts" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "image_front_url" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "energy_kcal_100g" DOUBLE PRECISION NOT NULL,
    "proteins_100g" DOUBLE PRECISION NOT NULL,
    "carbohydrates_100g" DOUBLE PRECISION NOT NULL,
    "fat_100g" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "open_food_facts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "open_food_facts_id_key" ON "open_food_facts"("id");
