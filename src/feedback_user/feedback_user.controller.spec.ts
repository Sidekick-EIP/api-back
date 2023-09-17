import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackUserController } from './feedback_user.controller';
import { FeedbackUserService } from './feedback_user.service';

describe('FeedbackUserController', () => {
  let controller: FeedbackUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackUserController],
      providers: [FeedbackUserService],
    }).compile();

    controller = module.get<FeedbackUserController>(FeedbackUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
