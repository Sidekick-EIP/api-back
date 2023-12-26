import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PrismaService } from "../prisma/prisma.service";
import { UserInfoService } from "../user_infos/user_infos.service";
import { Rooms } from "./chat.helper";
import { MatchEvent } from "../common/events/match.event";

const pageSize = 25;

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

    console.log("connect ", socket.id, userId, sidekick, roomName);
    socket.join(roomName);

    /* socket.emit("message", "You are connected to the room " + roomName); */
  }

  handleDisconnect(socket: Socket) {
    const user = this.rooms.findUserBySocketId(socket.id);
    // socket.handshake.auth.token also works to get the user id

    console.log("disconnect ", socket.id, user?.userId);
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

  async getAllv2(email: string, cursor: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    const fullUser = await this.userInfosService.find(email);

    return await this.prismaService.message.findMany({
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
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
      orderBy: {
        createdAt: "desc",
      }
    });
  }

  async handleMatch(event: MatchEvent, server: Server) {
    const room1 = this.rooms.getRoom(event.id1);
    const room2 = this.rooms.getRoom(event.id2);

    console.log(room1, room2, event.id1, event.id2)
    if (!room1 && !room2) {
      console.log("room not found")
      return;
    }
    console.log("match event", room1, room2)
    const socket1 = server.sockets.sockets.get(room1?.users[0]?.socketId);
    console.log(socket1)
    const socket2 = server.sockets.sockets.get(room2?.users[0]?.socketId);
    console.log(socket2)
    socket1?.emit("match", true);
    socket2?.emit("match", true);

    // remove both rooms
    this.rooms.removeRoom(event.id1);
    this.rooms.removeRoom(event.id2);

    // create new room
    const roomName = [event.id1, event.id2].sort().join("_");
    socket1?.join(roomName);
    socket2?.join(roomName);

    this.rooms.addUserToRoom(roomName, {
      socketId: socket1?.id || "",
      userId: event.id1,
      sidekickId: event.id2,
    });

    this.rooms.addUserToRoom(roomName, {
      socketId: socket2?.id || "",
      userId: event.id2,
      sidekickId: event.id1,
    });
  }
}
