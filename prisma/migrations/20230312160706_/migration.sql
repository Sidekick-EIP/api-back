/*
  Warnings:

  - You are about to drop the `Sports_exercices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sports_exercices" DROP CONSTRAINT "Sports_exercices_userId_fkey";

-- DropTable
DROP TABLE "Sports_exercices";

-- CreateTable
CREATE TABLE "sports_exercices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sports_exercices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sports_exercices" ADD CONSTRAINT "sports_exercices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
