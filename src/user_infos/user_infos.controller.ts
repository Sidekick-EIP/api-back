import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserInfoService } from "./user_infos.service";
import { UserInfosDto } from "./dto/user.dto";
import { Public, GetCurrentUserEmail } from "../common/decorators";
import { EditInfosDto } from "./dto/edit.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { AdminGuard } from "../common/guards";

@Controller("user_infos")
export class UserInfosController {
  constructor(private userInfoService: UserInfoService) { }

  @Get("/")
  find(@Request() req: any) {
    return this.userInfoService.find(req.user.email);
  }

  @Get("sidekick")
  findSidekick(@Request() req: any) {
    return this.userInfoService.findSidekick(req.user.email);
  }

  @Post("/")
  add(@Request() req: any, @Body() dto: UserInfosDto) {
    return this.userInfoService.add(dto, req.user.email);
  }

  @Put("/update")
  update(@Request() req: any, @Body() dto: EditInfosDto) {
    return this.userInfoService.update(dto, req.user.email);
  }

  @Post("/sports")
  setSports(@GetCurrentUserEmail() email: string, @Body("sports") sports: string) {
    return this.userInfoService.setSports(email, sports);
  }

  @Post("/goal")
  setGoal(@GetCurrentUserEmail() email: string, @Body("goal") goal: string) {
    return this.userInfoService.setGoal(email, goal);
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 100000000, // file size limit
    },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/; // acceptable file types
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);

      if (extname && mimetype) {
        return cb(null, true);
      } else {
        return cb(new Error('Only images are allowed'), false);
      }
    },
  }))
  setAvatar(@GetCurrentUserEmail() email: string, @UploadedFile() file) {
    return this.userInfoService.setAvatar(email, file);
  }

  @UseGuards(AdminGuard)
  @Post("link_users")
  linkUsers(@Body() req: { id1: string; id2: string }) {
    return this.userInfoService.linkUsers(req);
  }

  @Public()
  @Get("find_users_without_sidekick")
  findUsersWithoutSidekick() {
    return this.userInfoService.findUsersWithoutSidekick();
  }
}
