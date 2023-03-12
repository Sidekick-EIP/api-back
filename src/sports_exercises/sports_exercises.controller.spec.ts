import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SportsExerciseController } from './sports_exercises.controller';
import { SportsExerciseService } from './sports_exercises.service';

describe('SportsExerciseController', () => {
  let controller: SportsExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsExerciseController],
      providers: [SportsExerciseService, PrismaService, ConfigService]
    }).compile();

    controller = module.get<SportsExerciseController>(SportsExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
