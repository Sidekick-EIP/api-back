import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user_infos/user_infos.service';
import { ChatService } from './chat.service';
import { FileService } from '../file/file.service';

describe('ChatService', () => {
  let service: ChatService;
  let userInfoService: UserInfoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, UserInfoService, PrismaService, ConfigService, FileService],
    }).compile();

    service = module.get<ChatService>(ChatService);
    userInfoService = module.get<UserInfoService>(UserInfoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
