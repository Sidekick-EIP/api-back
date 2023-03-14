import { Test, TestingModule } from '@nestjs/testing';
import { SportsExerciseService } from './sports_exercises.service';
import { SportsExerciseController } from './sports_exercises.controller';
import { SportsExerciseModule } from './sports_exercises.module';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';

describe('SportsExerciseModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SportsExerciseModule, PrismaModule, ConfigModule, FileModule],
      providers: [SportsExerciseService, PrismaService, ConfigService, FileService],
      controllers: [SportsExerciseController],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});