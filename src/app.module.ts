import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { UserInfosModule } from './user_infos/user_infos.module';
import { StepsModule } from "./steps/steps.module";
import { NutritionService } from './nutrition/nutrition.service';
import { NutritionController } from './nutrition/nutrition.controller';
import { NutritionModule } from './nutrition/nutrition.module';
import { ChatModule } from './chat/chat.module';
import { ReportsModule } from './reports/reports.module';
import { FileModule } from './file/file.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { PreferencesModule } from './preferences/preferences.module';
import { OpenffModule } from './openff/openff.module';
import { ExercisesLibraryModule } from './exercises_library/exercises_library.module';
import { MealRecoModule } from './meal_reco/meal_reco.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FeedbackUserModule } from './feedback_user/feedback_user.module';
import { TicketsModule } from './tickets/tickets.module';
import { UserAdminModule } from './user_admin/user_admin.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ThrottlerModule.forRoot({
    ttl: 60,
    limit: 60,
  }), PrismaModule, AuthModule, UserInfosModule, StepsModule, NutritionModule, ChatModule, ReportsModule, FileModule, ReportsModule, WorkoutsModule, PreferencesModule, OpenffModule, ExercisesLibraryModule, MealRecoModule, EventEmitterModule.forRoot(), FeedbackUserModule, TicketsModule, UserAdminModule],
  controllers: [AppController, NutritionController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard
  }, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }, NutritionService],
})
export class AppModule { }
