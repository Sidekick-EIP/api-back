import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CaloriesController } from './calories.controller';
import { CaloriesService } from './calories.service';

describe('CaloriesController', () => {
  let controller: CaloriesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaloriesController],
      providers: [CaloriesService, PrismaService, ConfigService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<CaloriesController>(CaloriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
