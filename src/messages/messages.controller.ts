import { MessagesService } from './messages.service';
import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';

@Controller('messages')
export class MessagesController {
	constructor(private messagesUserService: MessagesService) { }

    @Public()
    @Get("getMessages")
    getUserInfos(@Query() query : { id : string}) {
      return this.messagesUserService.getMessages(query.id);
    }
}
