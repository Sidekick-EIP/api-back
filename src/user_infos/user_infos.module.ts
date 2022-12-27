import { Module } from '@nestjs/common';
import { UserInfosController } from './user_infos.controller';
import { UserInfoService } from './user_infos.service';

@Module({
  providers: [UserInfoService],
  controllers: [UserInfosController],
  exports: [UserInfoService],
})
export class UserInfosModule {}
