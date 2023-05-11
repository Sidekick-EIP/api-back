import { Controller, Get, Param } from "@nestjs/common";
import { GetCurrentUserEmail } from "../common/decorators";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get("/all")
  getAllMessages(@GetCurrentUserEmail() email: string) {
    return this.chatService.getAll(email);
  }
}
