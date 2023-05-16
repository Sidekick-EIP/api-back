-- DropForeignKey
ALTER TABLE "planning" DROP CONSTRAINT "planning_userId_fkey";

-- DropForeignKey
ALTER TABLE "sports_exercices" DROP CONSTRAINT "sports_exercices_userId_fkey";

-- AddForeignKey
ALTER TABLE "sports_exercices" ADD CONSTRAINT "sports_exercices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning" ADD CONSTRAINT "planning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
