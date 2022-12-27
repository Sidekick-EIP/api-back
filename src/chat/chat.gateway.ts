import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "../chat/chat.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    console.log("connection");
    return this.chatService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket) {
    console.log("disconnect");
    return this.chatService.handleDisconnect(socket);
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
