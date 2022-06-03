-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "SportFrequence" AS ENUM ('NEVER', 'LESS_THAN_ONCE_A_MONTH', 'ONCE_A_MONTH', 'ONCE_IN_TWO_WEEKS', 'ONCE_A_WEEK', 'TWICE_A_WEEK', 'THREE_A_WEEK', 'FOUR_A_WEEK', 'FIVE_A_WEEK', 'MORE_THEN_FIVE_A_WEEK');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_data" (
    "userId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" TEXT NOT NULL,
    "sport_frequence" "SportFrequence" NOT NULL,

    CONSTRAINT "users_data_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users_data" ADD CONSTRAINT "users_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
