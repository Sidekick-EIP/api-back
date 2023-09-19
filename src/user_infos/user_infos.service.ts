import { Gender, SportFrequence, Goal } from "@prisma/client";
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
      username: sidekickDatas.username,
      avatar: sidekickDatas.avatar,
      lastname: sidekickDatas.lastname,
      firstname: sidekickDatas.firstname,
      bio: sidekickDatas.description,
      frequence_sportive: sidekickDatas.sport_frequence,
    };
  }

  public async add(datas: UserInfosDto, userEmail: string) {
    var newDatas = datas;
    newDatas["size"] = Number(datas["size"]);
    newDatas["weight"] = Number(datas["weight"]);
    newDatas["gender"] = Gender[datas["gender"]];
    newDatas["birth_date"] = new Date(datas.birth_date);
    newDatas["sport_frequence"] = 
        SportFrequence[datas["sport_frequence"].toUpperCase()];
    newDatas["goal"] = Goal[datas["goal"].toUpperCase()];

    var user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new UserNotFoundException(userEmail);
    }
    newDatas["userId"] = user.id;

    const userInfos = await this._prismaService.userData.findFirst({
      where: {
        username: newDatas.username,
      }
    });
    if (!userInfos) {
      return await this._prismaService.userData.create({
        data: newDatas,
      });
    } else {
      throw new ConflictException('An user with the username \'' + newDatas.username + '\' already exist for this user.');
    }
  }

  async update(dto: EditInfosDto, email: string) {
    const data = dto;

    data.size ? (data.size = Number(dto.size)) : null;
    data.weight ? (data.weight = Number(dto.weight)) : null;
    data.gender ? (data.gender = Gender[data.gender]) : null;
    data.sport_frequence
      ? (data.sport_frequence =
        SportFrequence[dto.sport_frequence?.toUpperCase()])
      : null;
    data.goal
      ? (data.goal =
          Goal[dto.goal?.toUpperCase()])
      : null;


    const user = await this._prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UserNotFoundException(email);
    }

    if (data.username) {
      const existingUser = await this._prismaService.userData.findFirst({
        where: {
          username: data.username,
        },
      });

      if (existingUser && existingUser.userId !== user.id) {
        throw new ConflictException(`An user with the username '${data.username}' already exists.`);
      }
    }

    return await this._prismaService.userData.update({
      where: {
        userId: user.id,
      },
      data: data,
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

  async setSports(email: string, sports: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UserNotFoundException(email);
    }

    return this._prismaService.userData.update({
      where: {
        userId: user.id,
      },
      data: {
        sports: sports,
      },
    });
  }

  async setGoal(email: string, goal: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UserNotFoundException(email);
    }

    return this._prismaService.userData.update({
      where: {
        userId: user.id,
      },
      data: {
        goal: Goal[goal.toUpperCase()]
      },
    });
  }
}
