import { Controller, Get, Post } from '@nestjs/common';
import { UserInfoService } from './user_infos.service';

@Controller('user_infos')
export class UserInfosController {
    constructor(private userInfoService: UserInfoService) { }

    @Get("getUserInfos")
    getUserInfos() {
      this.userInfoService.getUserInfo();
    }
  
    @Post("setUserInfos")
    setUserInfos() {
      this.userInfoService.setUserInfo();
    }
}