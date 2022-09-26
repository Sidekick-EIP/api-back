import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserInfoService } from './user_infos.service';
import {UserInfosDto } from './dto/user.dto';
import { Public } from '../common/decorators';

@Controller('user_infos')
export class UserInfosController {
    constructor(private userInfoService: UserInfoService) { }

    @Get("getUserInfos")
    getUserInfos(@Query() query : { id : string}) {
      return this.userInfoService.getUserInfoById(query.id);
    }

    @Public() 
    @Post("setUserInfos")
    setUserInfos(@Body() dto: UserInfosDto) {
      return this.userInfoService.setUserInfo(dto);
    }
}