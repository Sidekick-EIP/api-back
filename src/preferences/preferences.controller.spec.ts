import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';

describe('PreferencesController', () => {
  let controller: PreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferencesController],
      providers: [PreferencesService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<PreferencesController>(PreferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
