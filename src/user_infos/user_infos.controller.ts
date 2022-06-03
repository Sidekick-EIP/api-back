import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInfoService } from './user_infos.service';
import {UserInfosDto } from './dto/user.dto';
import { Public } from 'src/common/decorators';

@Controller('user_infos')
export class UserInfosController {
    constructor(private userInfoService: UserInfoService) { }

    @Get("getUserInfos")
    getUserInfos() {
      this.userInfoService.getUserInfoById("0");
    }
    @Public() 
    @Post("setUserInfos")
    setUserInfos(@Body() dto: UserInfosDto) {
      return this.userInfoService.setUserInfo(dto);
    }
}