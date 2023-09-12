import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "../chat/chat.service";
import { Server, Socket } from "socket.io";
import { OnEvent } from '@nestjs/event-emitter';
import { MatchEvent } from "../common/events/match.event";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) { }

  async handleConnection(socket: Socket) {
    return this.chatService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket) {
    return this.chatService.handleDisconnect(socket);
  }

  // disconnect after match and connect to the new room with sidekick
  @OnEvent('match')
  handleMatch(event: MatchEvent): any {
    console.log("match event");
    return this.chatService.handleMatch(event, this.server);
  }

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): any {
    return this.chatService.handleMessage(client, payload);
  }

  @SubscribeMessage("writing")
  handleWriting(client: any, payload: any): any {
    return this.chatService.handleWriting(client, payload);
  }

  @SubscribeMessage("seen")
  handleSeen(client: any, payload: any): any {
    return this.chatService.handleSeen(client, payload);
  }
}
