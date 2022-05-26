import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from './exceptions/not-found.exception';

@Injectable()
export class UserInfoService {
    constructor(private _prismaService: PrismaService) {}

    public getAllUserInfo() {
        return this._prismaService.user.findMany();
    }
    public getUserInfoById(id: string) {
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


    async setUserInfo(id : string, ) {
        console.log("setter");
    }
}
