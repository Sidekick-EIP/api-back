-- CreateTable
CREATE TABLE "feedback_user" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "feedback_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedback_user_id_key" ON "feedback_user"("id");

-- AddForeignKey
ALTER TABLE "feedback_user" ADD CONSTRAINT "feedback_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
