/*
  Warnings:

  - You are about to drop the column `description` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sport_frequence` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "description",
DROP COLUMN "firstname",
DROP COLUMN "gender",
DROP COLUMN "lastname",
DROP COLUMN "size",
DROP COLUMN "sport_frequence",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "UserData" (
    "userId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" TEXT NOT NULL,
    "sport_frequence" "SportFrequence" NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
