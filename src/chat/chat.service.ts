import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { PrismaService } from "../prisma/prisma.service";
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

    socket.join(roomName);

    /* socket.emit("message", "You are connected to the room " + roomName); */
  }

  handleDisconnect(socket: any) {
    const user = this.rooms.findUserBySocketId(socket.id);
    // socket.handshake.auth.token also works to get the user id

    if (!user) {
      return;
    }

    this.rooms.removeUserFromRoom(user.userId, socket.id);

    if (this.rooms.getRoom(user.userId)?.users.length === 0) {
      this.rooms.removeRoom(user.userId);
    }
  }

  async handleMessage(socket: Socket, payload: any) {
    socket.broadcast.emit("message", payload);

    // save message to db
    const user = this.rooms.findUserBySocketId(socket.id);

    if (!user) return;

    await this.prismaService.message.create({
      data: {
        from_id: user.userId,
        to: user.sidekickId,
        content: payload,
      },
    });

    /* socket.emit("message", "You sent : " + payload); */
  }

  async handleWriting(socket: Socket, payload: any) {
    socket.broadcast.emit("writing", {});

    /* socket.emit("writing", "Received writing event"); */
  }

  async handleSeen(socket: Socket, payload: any) {
    socket.broadcast.emit("seen", {});

    const user = this.rooms.findUserBySocketId(socket.id);

    await this.prismaService.message.updateMany({
      where: {
        from_id: user.sidekickId,
        seen: false,
      },
      data: {
        seen: true,
      },
    });
    /* socket.emit("seen", "Received seen event"); */
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
