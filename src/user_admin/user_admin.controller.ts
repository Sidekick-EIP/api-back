import { Body, Controller, Get, ParseBoolPipe, Post, Query, UseGuards } from '@nestjs/common';
import { UserAdminService } from './user_admin.service';
import { AdminGuard } from 'src/common/guards';
import { EditInfosDto } from 'src/user_infos/dto/edit.dto';
import { Public } from 'src/common/decorators';
import { GetUserAdminDto } from './dto/user_admin.dto';

@Controller('user_admin')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) { }

  // @UseGuards(AdminGuard)
  @Public()
  @Get()
  users(@Query('email') email: string, @Query('sidekick', ParseBoolPipe) hasSidekick: boolean) {
    return this.userAdminService.findAll({email, hasSidekick});
  }

  // @UseGuards(AdminGuard)
  @Public()
  @Post("/update")
  update_user(@Query("user_id") id: string, @Body() query: EditInfosDto) {
    return this.userAdminService.update(id, query);
  }
}
