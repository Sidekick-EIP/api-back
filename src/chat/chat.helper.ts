export type SocketUser = {
  socketId: string;
  userId: string;
  sidekickId: string;
};

export type Room = {
  name: string;
  users: SocketUser[];
};

export class Rooms {
  private rooms: Room[] = [];

  constructor() {}

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  removeRoom(roomId: string) {
    this.rooms = this.rooms.filter((room) => room.name !== roomId);
  }

  getRoom(roomId: string) {
    return this.rooms.find((room) => room.name === roomId);
  }

  addUserToRoom(roomId: string, user: SocketUser) {
    const room = this.getRoom(roomId);
    if (room) {
      room.users.push(user);
    }
  }

  removeUserFromRoom(roomId: string, userId: string) {
    const room = this.getRoom(roomId);
    if (room) {
      room.users = room.users.filter((user) => user.userId !== userId);
    }
  }

  getRoomUsers(roomId: string) {
    const room = this.getRoom(roomId);
    if (room) {
      return room.users;
    }
  }

  findUserBySocketId(socketId: string) {
    for (const room of this.rooms) {
      const user = room.users.find((user) => user.socketId === socketId);
      if (user) {
        return user;
      }
    }
  }
}
