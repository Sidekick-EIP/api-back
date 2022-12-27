import { Module } from '@nestjs/common';
import { UserInfosModule } from 'src/user_infos/user_infos.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [UserInfosModule],
})
export class ChatModule {}
