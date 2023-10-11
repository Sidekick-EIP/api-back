-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises_library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
