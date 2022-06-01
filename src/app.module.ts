import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { UserInfosController } from './user_infos/user_infos.controller';
import { UserInfosModule } from './user_infos/user_infos.module';

const envFilePath = getEnvPath(`${__dirname}`);

@Module({
  imports: [ConfigModule.forRoot({envFilePath, isGlobal: true}), PrismaModule, AuthModule, UserInfosModule],
  controllers: [AppController, UserInfosController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard
  }],
})
export class AppModule {}
