import { MealsService } from './meals.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MealsController } from './meals.controller';
import { PrismaService } from './../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('MealsController', () => {
  let controller: MealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealsController],
      providers: [MealsService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<MealsController>(MealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
