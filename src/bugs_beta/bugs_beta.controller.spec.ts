import { Test, TestingModule } from '@nestjs/testing';
import { BugsBetaController } from './bugs_beta.controller';

describe('BugsBetaController', () => {
  let controller: BugsBetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugsBetaController],
    }).compile();

    controller = module.get<BugsBetaController>(BugsBetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
