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

    public async getUserInfoById(userId: string) {
        const user = await this._prismaService.userData.findUnique({ 
            where: {
                userId: userId
            }
        });
        if (!user) {
            throw new UserNotFoundException(userId);
        }
        const userEmail = await this._prismaService.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!userEmail) {
            throw new UserNotFoundException(userId);
        }
        user['email'] = userEmail['email'];
        return user;
    }

    public async setUserInfo(datas: UserInfosDto) {
        return this._prismaService.userData.update({
          where: { userId: String(datas.userId) },
          data: datas
        });
    }
}