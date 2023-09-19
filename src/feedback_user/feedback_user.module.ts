import { Module } from '@nestjs/common';
import { FeedbackUserService } from './feedback_user.service';
import { FeedbackUserController } from './feedback_user.controller';

@Module({
  controllers: [FeedbackUserController],
  providers: [FeedbackUserService]
})
export class FeedbackUserModule {}
