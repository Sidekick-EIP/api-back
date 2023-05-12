-- CreateTable
CREATE TABLE "OpenFoodFacts" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "image_front_url" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "energy_kcal_100g" DOUBLE PRECISION NOT NULL,
    "proteins_100g" DOUBLE PRECISION NOT NULL,
    "carbohydrates_100g" DOUBLE PRECISION NOT NULL,
    "fat_100g" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OpenFoodFacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpenFoodFacts_id_key" ON "OpenFoodFacts"("id");
