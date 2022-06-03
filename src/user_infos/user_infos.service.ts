import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from './exceptions/not-found.exception';
import {UserInfosDto } from './dto/user.dto';

@Injectable()
export class UserInfoService {
    constructor(private _prismaService: PrismaService) {}

    public async getAllUserInfo() {
        return this._prismaService.user.findMany();
    }

    public async getUserInfoById(id: string) {
        const user = this._prismaService.user.findUnique({ 
            where: {
                id
            }
            });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;

    }

    public async setUserInfo(datas: UserInfosDto) {
        return this._prismaService.user.update({
          where: { id: String(datas.userId) },
          data: datas
        });
    }
}