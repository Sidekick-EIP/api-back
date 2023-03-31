import { Test, TestingModule } from '@nestjs/testing';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('PlanningController', () => {
  let controller: PlanningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanningController],
      providers: [PlanningService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<PlanningController>(PlanningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
