import { Module } from '@nestjs/common';
import { FileModule } from '../file/file.module';
import { UserInfosController } from './user_infos.controller';
import { UserInfoService } from './user_infos.service';

@Module({
  providers: [UserInfoService],
  controllers: [UserInfosController],
  exports: [UserInfoService],
  imports: [FileModule],
})
export class UserInfosModule {}
