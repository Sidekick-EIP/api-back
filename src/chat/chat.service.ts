import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInfoService } from "../user_infos/user_infos.service";
import { Rooms } from "./chat.helper";

@Injectable()
export class ChatService {
  private rooms = new Rooms();

  constructor(
    private userInfosService: UserInfoService,
    private prismaService: PrismaService
  ) {}

  async handleConnection(socket: Socket) {
    const userId = socket.handshake.auth.token;
    if (!userId) {
      socket.disconnect();
      return;
    }

    const user = await this.userInfosService.getUserfromId(userId);
    const sidekick = user.sidekick_id;

    if (!sidekick) {
      socket.disconnect();
      return;
    }

    const roomName = [userId, sidekick].sort().join("_");
    let room = this.rooms.getRoom(roomName);
    if (!room) {
      room = {
        name: roomName,
        users: [],
      };
      this.rooms.addRoom(room);
    }
    this.rooms.addUserToRoom(roomName, {
      socketId: socket.id,
      userId: userId,
      sidekickId: sidekick,
    });

    socket.emit("message", "You are connected to the room " + roomName);
  }

  handleDisconnect(socket: any) {
    const user = this.rooms.findUserBySocketId(socket.id);
    // socket.handshake.auth.token also works to get the user id

    if (!user) {
      return;
    }

    this.rooms.removeUserFromRoom(user.userId, socket.id);
    console.log(this.rooms);
  }

  handleMessage(socket: Socket, payload: any) {
    socket.emit("message", "You sent : " + payload);
  }

  handleWriting(socket: Socket, payload: any) {
    socket.emit("writing", "Received writing event");
  }

  handleSeen(socket: Socket, payload: any) {
    socket.emit("seen", "Received seen event");
  }

  async getAll(id: string) {
    return await this.prismaService.message.findMany({
      where: {
        OR: [
          {
            from_id: id,
          },
          {
            to: id,
          },
        ],
      },
    });
  }
}
