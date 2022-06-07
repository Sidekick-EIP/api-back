import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserInfosController } from './user_infos.controller';
import { UserInfoService } from './user_infos.service';
import { ConfigService } from '@nestjs/config';

describe('UserInfosController', () => {
  let controller: UserInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInfosController],
      providers: [UserInfoService, PrismaService, ConfigService]
    }).compile();

    controller = module.get<UserInfosController>(UserInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});