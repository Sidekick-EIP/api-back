-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
