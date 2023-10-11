import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsModule } from './workouts.module';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';

describe('WorkoutsModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [WorkoutsModule, PrismaModule, ConfigModule, FileModule],
      providers: [WorkoutsService, PrismaService, ConfigService, FileService],
      controllers: [WorkoutsController],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});