import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { StepsController } from "./steps.controller";
import { StepsService } from './steps.service';

describe('StepsController', () => {
  let controller: StepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepsController],
      providers: [StepsService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<StepsController>(StepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
