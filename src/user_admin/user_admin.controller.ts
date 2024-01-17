import { Body, Controller, Get, ParseBoolPipe, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { UserAdminService } from './user_admin.service';
import { AdminGuard } from 'src/common/guards';
import { EditInfosDto } from 'src/user_infos/dto/edit.dto';
import { Public } from 'src/common/decorators';
import { GetUserAdminDto } from './dto/user_admin.dto';

@Controller('user_admin')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) { }
  @UseGuards(AdminGuard)
  @Get()
  users(@Query('email') email: string, @Query('sidekick', ParseBoolPipe) hasSidekick: boolean, @Query('cursor', ParseIntPipe) cursor: number = 0) {
    return this.userAdminService.findAll({email, hasSidekick, cursor});
  }

  @UseGuards(AdminGuard)
  @Post("/update")
  update_user(@Query("user_id") id: string, @Body() query: EditInfosDto) {
    return this.userAdminService.update(id, query);
  }
}
