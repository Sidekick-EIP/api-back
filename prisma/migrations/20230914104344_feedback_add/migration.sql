/*
  Warnings:

  - You are about to drop the column `description` on the `feedback_user` table. All the data in the column will be lost.
  - Added the required column `comment` to the `feedback_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback_user" DROP COLUMN "description",
ADD COLUMN     "comment" TEXT NOT NULL;
