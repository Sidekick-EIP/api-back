import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackUserService } from './feedback_user.service';

describe('FeedbackUserService', () => {
  let service: FeedbackUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackUserService],
    }).compile();

    service = module.get<FeedbackUserService>(FeedbackUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
