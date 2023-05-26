import { Test, TestingModule } from '@nestjs/testing';
import { AlgoMatchingService } from './algo-matching.service';

describe('AlgoMatchingService', () => {
  let service: AlgoMatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgoMatchingService],
    }).compile();

    service = module.get<AlgoMatchingService>(AlgoMatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
