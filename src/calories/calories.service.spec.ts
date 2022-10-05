import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CaloriesService } from './calories.service';

describe('CaloriesService', () => {
  let service: CaloriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaloriesService, PrismaService, ConfigService],
    }).compile();

    service = module.get<CaloriesService>(CaloriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
