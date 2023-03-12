import { Module } from '@nestjs/common';
import { SportsExerciseService } from './sports_exercises.service';
import { SportsExerciseController } from './sports_exercises.controller';

@Module({
  providers: [SportsExerciseService],
  controllers: [SportsExerciseController]
})
export class SportsExerciseModule {}
