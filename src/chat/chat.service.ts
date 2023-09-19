import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PrismaService } from "../prisma/prisma.service";
import { UserInfoService } from "../user_infos/user_infos.service";
import { Rooms } from "./chat.helper";
import { MatchEvent } from "../common/events/match.event";

@Injectable()
export class ChatService {
  private rooms = new Rooms();

  constructor(
    private userInfosService: UserInfoService,
    private prismaService: PrismaService,
  ) { }

  async handleConnection(socket: Socket) {
    const userId = socket.handshake.auth.token;
    if (!userId) {
      socket.disconnect();
      return;
    }

    let user = null;
    try {
      user = await this.userInfosService.getUserfromId(userId);
    } catch (e) {
      socket.disconnect();
      return;
    }
    const sidekick = user.sidekick_id || "";

    let roomName = sidekick === "" ? userId : [userId, sidekick].sort().join("_");
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

  handleDisconnect(socket: Socket) {
    const user = this.rooms.findUserBySocketId(socket.id);
    // socket.handshake.auth.token also works to get the user id

    console.log("disconnect ", socket.id);
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
    console.log(this.rooms, this.rooms.getRoomUsers(user.userId))

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
    socket.broadcast.emit("writing", payload);

    /* socket.emit("writing", "Received writing event"); */
  }

  async handleSeen(socket: Socket, payload: any) {
    socket.broadcast.emit("seen", {});

    const user = this.rooms.findUserBySocketId(socket.id);

    if (!user) return;

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

  async getAll(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    const fullUser = await this.userInfosService.find(email);

    return await this.prismaService.message.findMany({
      where: {
        OR: [
          {
            from_id: user.id,
            to: fullUser.sidekick_id,
          },
          {
            from_id: fullUser.sidekick_id,
            to: user.id,
          },
        ],
      },
    });
  }

  async handleMatch(event: MatchEvent, server: Server) {
    const room1 = this.rooms.getRoom(event.id1);
    const room2 = this.rooms.getRoom(event.id2);

    if (!room1 || !room2) {
      return;
    }
    const user1 = room1.users[0];
    server.to(user1.socketId).emit("match", true);
    const user2 = room2.users[0];
    server.to(user2.socketId).emit("match", true);
  }
}
