import { Test, TestingModule } from '@nestjs/testing';
import { BugsBetaService } from './bugs_beta.service';

describe('BugsBetaService', () => {
  let service: BugsBetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BugsBetaService],
    }).compile();

    service = module.get<BugsBetaService>(BugsBetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
