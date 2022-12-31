import { Body, Controller, Get, Post, Query, Request } from "@nestjs/common";
import { UserInfoService } from "./user_infos.service";
import { UserInfosDto } from "./dto/user.dto";
import { Public } from "../common/decorators";

@Controller("user_infos")
export class UserInfosController {
  constructor(private userInfoService: UserInfoService) {}

  @Get("getUserInfos")
  getUserInfos(@Request() req: any) {
    return this.userInfoService.getUserInfoById(req.user.email);
  }

  @Post("setUserInfos")
  setUserInfos(@Request() req: any, @Body() dto: UserInfosDto) {
    return this.userInfoService.setUserInfo(dto, req.user.email);
  }

  @Post("update/infos")
  updateInfos(@Request() req: any, @Body() dto: UserInfosDto) {
    return this.userInfoService.updateInfos(dto, req.user.email);
  }

  @Public()
  @Post("link_users")
  linkUsers(@Body() req: { id1: string; id2: string }) {
    return this.userInfoService.linkUsers(req);
  }
}
