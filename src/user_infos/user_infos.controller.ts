import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInfoService } from './user_infos.service';
import {UserInfosDto } from './dto/user.dto';
import { Public } from 'src/common/decorators';

@Controller('user_infos')
export class UserInfosController {
    constructor(private userInfoService: UserInfoService) { }

    @Public()
    @Get("getUserInfos")
    getUserInfos() {
      return this.userInfoService.getUserInfoById("583ad75e-0f49-4c42-b389-2a66bdec4091");
    }

    @Public() 
    @Post("setUserInfos")
    setUserInfos(@Body() dto: UserInfosDto) {
       return this.userInfoService.setUserInfo(dto);
    }
}