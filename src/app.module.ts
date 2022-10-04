import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { FormModule } from './form/form.module';
import { UserInfosModule } from './user_infos/user_infos.module';
import { MessagesModule } from './messages/messages.module';
import { CaloriesController } from './calories/calories.controller';
import { CaloriesService } from './calories/calories.service';
import { CaloriesModule } from './calories/calories.module';
import { StepsModule } from "./steps/steps.module";

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), PrismaModule, AuthModule, FormModule, UserInfosModule, MessagesModule, CaloriesModule, StepsModule],
  controllers: [AppController, CaloriesController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard
  }, CaloriesService],
})
export class AppModule {}
