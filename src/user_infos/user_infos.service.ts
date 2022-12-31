import { Gender, SportFrequence } from "@prisma/client";
import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import UserNotFoundException from "./exceptions/not-found.exception";
import { UserInfosDto } from "./dto/user.dto";
import { EditInfosDto } from "./dto/edit.dto";

@Injectable()
export class UserInfoService {
  constructor(private _prismaService: PrismaService) {}

  public async getAllUserInfo() {
    return this._prismaService.user.findMany();
  }

  public async getUserInfoById(userEmail: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      throw new UserNotFoundException(user.id);
    }
    const userDatas = await this._prismaService.userData.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!userDatas) {
      throw new UserNotFoundException(user.id);
    }
    userDatas["email"] = userEmail;
    return userDatas;
  }

  public async setUserInfo(datas: UserInfosDto, userEmail: string) {
    var newDatas = datas;
    newDatas["size"] = Number(datas["size"]);
    newDatas["weight"] = Number(datas["weight"]);
    newDatas["gender"] = Gender[datas["gender"]];
    newDatas["sport_frequence"] =
      SportFrequence[datas["sport_frequence"].toUpperCase()];
    var user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    newDatas["userId"] = user.id;
    return this._prismaService.userData.create({
      data: newDatas,
    });
  }

  async updateInfos(dto: EditInfosDto, email: string) {
    const data = dto;
    // check if fields are not empty
    data["size"] = Number(dto["size"]);
    data["weight"] = Number(dto["weight"]);
    data["gender"] = Gender[data["gender"]];
    data["sport_frequence"] = SportFrequence[dto["sport_frequence"].toUpperCase()];

    return await this._prismaService.userData.update({
      where: {
        userId: email,
      },
      data: data,
    });
  }

  public async linkUsers(req: { id1: string; id2: string }) {
    let { id1, id2 } = req;

    await Promise.all([
      this._prismaService.userData.update({
        where: {
          userId: id1,
        },
        data: {
          sidekick_id: id2,
        },
      }),
      this._prismaService.userData.update({
        where: {
          userId: id2,
        },
        data: {
          sidekick_id: id1,
        },
      }),
    ]);

    return HttpStatus.OK;
  }

  async getSidekick(id: string) {
    const user = await this._prismaService.userData.findUnique({
      where: {
        userId: id,
      },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return this._prismaService.userData.findUnique({
      where: {
        userId: user.sidekick_id,
      },
    });
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
}
