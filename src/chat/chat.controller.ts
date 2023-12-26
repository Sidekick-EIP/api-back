import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetCurrentUserEmail, Public } from "../common/decorators";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get("/all")
  getAllMessages(@GetCurrentUserEmail() email: string) {
    return this.chatService.getAll(email);
  }

  @Get("/v2/all")
  getAllMessagesv2(@GetCurrentUserEmail() email: string, @Query("cursor") cursor: string) {
    return this.chatService.getAllv2(email, cursor);
  }
}
