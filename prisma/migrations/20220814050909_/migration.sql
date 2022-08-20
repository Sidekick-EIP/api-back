/*
  Warnings:

  - You are about to drop the `users_data` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport_frequence` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_data" DROP CONSTRAINT "users_data_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "sport_frequence" "SportFrequence" NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- DropTable
DROP TABLE "users_data";
