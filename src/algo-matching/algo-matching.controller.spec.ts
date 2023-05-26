import { Test, TestingModule } from '@nestjs/testing';
import { AlgoMatchingController } from './algo-matching.controller';
import { AlgoMatchingService } from './algo-matching.service';

describe('AlgoMatchingController', () => {
  let controller: AlgoMatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlgoMatchingController],
      providers: [AlgoMatchingService],
    }).compile();

    controller = module.get<AlgoMatchingController>(AlgoMatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
