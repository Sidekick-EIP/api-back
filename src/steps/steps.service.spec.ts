import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { StepsService } from "./steps.service";

describe('StepsService', () => {
  let service: StepsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StepsService, PrismaService, ConfigService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<StepsService>(StepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
