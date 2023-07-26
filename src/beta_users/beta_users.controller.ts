import { Controller, Post, Request, Body } from '@nestjs/common';
import { BetaUsersDto } from './dto/beta_users.dto';
import { BetaUsersService } from './beta_users.service';

@Controller('beta-users')
export class BetaUsersController {
	constructor(private betaUsersService: BetaUsersService) { }

    @Post("/")
    addBugsBeta(@Body() dto: BetaUsersDto) {
      return this.betaUsersService.add(dto);
	}
}
