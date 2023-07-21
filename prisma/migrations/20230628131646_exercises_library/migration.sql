-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('SHOULDERS', 'CHEST', 'BACK', 'BICEPS', 'TRICEPS', 'ABS', 'LEGS', 'GLUTES', 'CALF', 'CARDIO', 'FULL_BODY', 'OTHER');

-- CreateTable
CREATE TABLE "exercises_library" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT,
    "video" TEXT NOT NULL,
    "muscle_group" "MuscleGroup",

    CONSTRAINT "exercises_library_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercises_library_id_key" ON "exercises_library"("id");
