import { Test, TestingModule } from '@nestjs/testing';
import { BetaUsersService } from './beta_users.service';

describe('BetaUsersService', () => {
  let service: BetaUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetaUsersService],
    }).compile();

    service = module.get<BetaUsersService>(BetaUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
