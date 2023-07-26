-- CreateTable
CREATE TABLE "beta_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,

    CONSTRAINT "beta_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beta_users_id_key" ON "beta_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "beta_users_email_key" ON "beta_users"("email");
