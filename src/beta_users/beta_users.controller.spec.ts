import { Test, TestingModule } from '@nestjs/testing';
import { BetaUsersController } from './beta_users.controller';

describe('BetaUsersController', () => {
  let controller: BetaUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetaUsersController],
    }).compile();

    controller = module.get<BetaUsersController>(BetaUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
