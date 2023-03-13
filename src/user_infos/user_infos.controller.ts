import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UserInfoService } from "./user_infos.service";
import { UserInfosDto } from "./dto/user.dto";
import { Public, GetCurrentUserEmail } from "../common/decorators";
import { EditInfosDto } from "./dto/edit.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("user_infos")
export class UserInfosController {
  constructor(private userInfoService: UserInfoService) { }

  @Get("getUserInfos")
  getUserInfos(@Request() req: any) {
    return this.userInfoService.getUserInfoById(req.user.email);
  }

  @Get("getSidekickInfos")
  getSidekickInfo(@Request() req: any) {
    return this.userInfoService.getSidekickInfo(req.user.email);
  }

  @Post("setUserInfos")
  setUserInfos(@Request() req: any, @Body() dto: UserInfosDto) {
    return this.userInfoService.setUserInfo(dto, req.user.email);
  }

  @Post("update/infos")
  updateInfos(@Request() req: any, @Body() dto: EditInfosDto) {
    return this.userInfoService.updateInfos(dto, req.user.email);
  }

  @Post("/avatar")
  @UseInterceptors(FileInterceptor("file"))
  setAvatar(
    @GetCurrentUserEmail() email: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1000000}),
          new FileTypeValidator({fileType: "(jpeg|jpg|png)"}),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.userInfoService.setAvatar(email, file);
  }

  @Public()
  @Post("link_users")
  linkUsers(@Body() req: { id1: string; id2: string }) {
    return this.userInfoService.linkUsers(req);
  }
}
