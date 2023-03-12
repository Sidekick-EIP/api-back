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
import { MealsService } from './meals/meals.service';
import { MealsController } from './meals/meals.controller';
import { MealsModule } from './meals/meals.module';
import { ChatModule } from './chat/chat.module';
import { ReportsModule } from './reports/reports.module';
import { SportsExerciseModule } from './sports_exercises/sports_exercises.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), PrismaModule, AuthModule, FormModule, UserInfosModule, MessagesModule, CaloriesModule, StepsModule, MealsModule, ChatModule, ReportsModule, SportsExerciseModule],
  controllers: [AppController, CaloriesController, MealsController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard
  }, CaloriesService, MealsService],
})
export class AppModule {}
