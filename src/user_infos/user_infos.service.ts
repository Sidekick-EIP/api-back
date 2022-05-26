import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from './exceptions/not-found.exception';

@Injectable()
export class UserInfoService {
    constructor(private _prismaService: PrismaService) {}

    async getAllUserInfo() {
        return this._prismaService.user.findMany();
    }

    async getUserInfoById(id: string) {
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

    async setUserInfo(id: string, username : string, description: string, email: string, weight: number) {
        return this._prismaService.user.update({
          where: { id: String(id) },
          data: { 
              username: username,
              email: email,
              description: description,
              weight: weight
            },
        });
    }
}