import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user_infos/user_infos.service';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let userInfoService: UserInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, UserInfoService, PrismaService, ConfigService],
    }).compile();

    service = module.get<ChatService>(ChatService);
    userInfoService = module.get<UserInfoService>(UserInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
