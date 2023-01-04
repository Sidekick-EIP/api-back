import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get("/all")
  getAllMessages(@Param() id: string) {
    return this.chatService.getAll(id);
  }
}
