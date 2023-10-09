/*
  Warnings:

  - The values [WEIGHT_GAIN,WEIGHT_LOSS,GETTING_BACK_IN_SHAPE] on the enum `Goal` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hobbies` on the `users_data` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Activities" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING', 'WEIGHTLIFTING', 'YOGA', 'PILATES', 'MARTIAL_ARTS', 'DANCING', 'HIKING', 'ROCK_CLIMBING', 'TENNIS', 'BASKETBALL', 'SOCCER', 'VOLLEYBALL', 'BASEBALL', 'SKIING', 'SNOWBOARDING', 'SURFING', 'GOLF', 'ROWING', 'CROSSFIT', 'GYMNASTICS', 'TRIATHLON', 'RUGBY', 'BOXING', 'SKATING', 'SQUASH', 'BADMINTON', 'HORSE_RIDING', 'TABLE_TENNIS');

-- AlterEnum
BEGIN;
CREATE TYPE "Goal_new" AS ENUM ('LOSE_WEIGHT', 'STAY_IN_SHAPE', 'GAIN_MUSCLE_MASS', 'BUILD_MUSCLE');
ALTER TABLE "users_data" ALTER COLUMN "goal" DROP DEFAULT;
ALTER TABLE "users_data" ALTER COLUMN "goal" TYPE "Goal_new" USING ("goal"::text::"Goal_new");
ALTER TYPE "Goal" RENAME TO "Goal_old";
ALTER TYPE "Goal_new" RENAME TO "Goal";
DROP TYPE "Goal_old";
ALTER TABLE "users_data" ALTER COLUMN "goal" SET DEFAULT 'STAY_IN_SHAPE';
COMMIT;

-- AlterTable
ALTER TABLE "users_data" DROP COLUMN "hobbies",
ADD COLUMN     "activities" TEXT[],
ALTER COLUMN "goal" SET DEFAULT 'STAY_IN_SHAPE';

-- DropEnum
DROP TYPE "Hobbies";
