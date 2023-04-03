import { Test, TestingModule } from '@nestjs/testing';
import { PlanningService } from './planning.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('PlanningService', () => {
  let service: PlanningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningService, PrismaService, ConfigService],
    }).compile();

    service = module.get<PlanningService>(PlanningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
