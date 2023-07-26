import { Module } from '@nestjs/common';
import { ExercisesLibraryService } from './exercises_library.service';
import { ExercisesLibraryController } from './exercises_library.controller';

@Module({
  controllers: [ExercisesLibraryController],
  providers: [ExercisesLibraryService]
})
export class ExercisesLibraryModule {}
