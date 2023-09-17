import { Controller, Post, Request, Body } from '@nestjs/common';
import { BetaUsersDto } from './dto/beta_users.dto';
import { BetaUsersService } from './beta_users.service';
import { Public } from '../common/decorators'

@Controller('beta-users')
export class BetaUsersController {
	constructor(private betaUsersService: BetaUsersService) { }

    @Public()
    @Post("/")
    addBugsBeta(@Body() dto: BetaUsersDto) {
      return this.betaUsersService.add(dto);
	}
}
