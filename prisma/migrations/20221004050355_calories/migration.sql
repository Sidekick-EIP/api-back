-- CreateTable
CREATE TABLE "steps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nbOfSteps" INTEGER NOT NULL,

    CONSTRAINT "steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
