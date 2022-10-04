-- CreateTable
CREATE TABLE "calories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nbCalories" INTEGER NOT NULL,

    CONSTRAINT "calories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calories" ADD CONSTRAINT "calories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
