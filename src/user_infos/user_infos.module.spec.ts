import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserInfosModule } from './user_infos.module';
import { UserInfoService } from './user_infos.service';
import { UserInfosController } from './user_infos.controller';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';

describe('UserInfoModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UserInfosModule, PrismaModule, FileModule, ConfigModule],
      providers: [UserInfoService, PrismaService, ConfigService],
      controllers: [UserInfosController],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});