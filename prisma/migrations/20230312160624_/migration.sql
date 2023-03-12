-- CreateTable
CREATE TABLE "Sports_exercices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sports_exercices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sports_exercices" ADD CONSTRAINT "Sports_exercices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
