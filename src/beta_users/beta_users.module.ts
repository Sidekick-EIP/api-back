import { Module } from '@nestjs/common';
import { BetaUsersService } from './beta_users.service';
import { BetaUsersController } from './beta_users.controller';

@Module({
  providers: [BetaUsersService],
  controllers: [BetaUsersController]
})
export class BetaUsersModule {}
