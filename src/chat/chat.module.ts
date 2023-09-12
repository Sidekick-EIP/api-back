import { Module, forwardRef } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserInfosModule } from '../user_infos/user_infos.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [UserInfosModule],
  controllers: [ChatController],
  exports: [ChatGateway],
})
export class ChatModule { }
