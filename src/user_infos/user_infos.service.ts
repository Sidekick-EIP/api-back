import { Gender, Activities, Goal, Level } from "@prisma/client";
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import UserNotFoundException from "./exceptions/not-found.exception";
import { UserWithoutSidekickException } from "./exceptions/not-found.exception";
import { UserInfosDto } from "./dto/user.dto";
import { EditInfosDto } from "./dto/edit.dto";
import { FileService } from "../file/file.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UserInfoService {
  constructor(
    private _prismaService: PrismaService,
    private _fileService: FileService,
    private eventEmitter: EventEmitter2,
  ) { }

  public async findUsersWithoutSidekick() {
    const usersDatas = await this._prismaService.userData.findMany({
      where: {
        sidekick_id: null,
      },
    });
    return usersDatas;
  }

  public async find(userEmail: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }
    const userDatas = await this._prismaService.userData.findUnique({
      where: {
        userId: user.id,
      },
    });
    userDatas["email"] = userEmail;
    return userDatas;
  }

  public async findSidekick(userEmail: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }
    const userDatas = await this._prismaService.userData.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!userDatas.sidekick_id) {
      throw new UserWithoutSidekickException(user.id);
    }
    const sidekickDatas = await this._prismaService.userData.findUnique({
      where: {
        userId: userDatas.sidekick_id,
      },
    });
    return {
      birth_date: sidekickDatas.birth_date,
      gender: sidekickDatas.gender,
      avatar: sidekickDatas.avatar,
      lastname: sidekickDatas.lastname,
      firstname: sidekickDatas.firstname,
      size: sidekickDatas.size,
      bio: sidekickDatas.description,
      goal: sidekickDatas.goal,
      level: sidekickDatas.level,
      activities: sidekickDatas.activities,
      location: sidekickDatas.location
    };
  }

  public async add(datas: UserInfosDto, userEmail: string) {
    var user = await this._prismaService.user.findUnique({
      where: {email: userEmail}
    });

    if (!user) {
      throw new UserNotFoundException(userEmail);
    }
    datas["userId"] = user.id;

    return await this._prismaService.userData.create({
      data: datas,
    });
  }

  async update(datas: EditInfosDto, email: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UserNotFoundException(email);
    }
    return await this._prismaService.userData.update({
      where: {
        userId: user.id,
      },
      data: datas,
    });
  }

  public async linkUsers(req: { id1: string; id2: string }) {
    let { id1, id2 } = req;
    console.log(id1, id2)
    const user1 = await this._prismaService.userData.findUnique({
      where: { userId: id1 },
    });
    const user2 = await this._prismaService.userData.findUnique({
      where: { userId: id2 },
    });

    if (user1.sidekick_id) {
      throw new ConflictException("The user with id '" + id1 + "'");
    } else if (user2.sidekick_id) {
      throw new ConflictException("The user with id '" + id2 + "'");
    } else {
      await Promise.all([
        this._prismaService.userData.update({
          where: { userId: id1 },
          data: { sidekick_id: id2 },
        }),
        this._prismaService.userData.update({
          where: { userId: id2 },
          data: { sidekick_id: id1 },
        }),
      ]);
    }
    this.eventEmitter.emit('match', { id1, id2 })
    return HttpStatus.OK;
  }

  async getUserfromId(id: string) {
    const user = await this._prismaService.userData.findUnique({
      where: {
        userId: id,
      },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  async setAvatar(email: string, file: Express.Multer.File) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UserNotFoundException(email);
    }

    const avatar = await this._fileService.uploadPublicFile(file);

    return this._prismaService.userData.update({
      where: {
        userId: user.id,
      },
      data: {
        avatar: avatar,
      },
    });
  }
}
