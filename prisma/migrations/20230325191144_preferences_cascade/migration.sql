-- DropForeignKey
ALTER TABLE "preferences" DROP CONSTRAINT "preferences_userId_fkey";

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
