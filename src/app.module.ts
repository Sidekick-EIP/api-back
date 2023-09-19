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
import { FileModule } from './file/file.module';
import { SportsExerciseModule } from './sports_exercises/sports_exercises.module';
import { PlanningModule } from './planning/planning.module';
import { PreferencesModule } from './preferences/preferences.module';
import { OpenffModule } from './openff/openff.module';
import { BugsBetaService } from './bugs_beta/bugs_beta.service';
import { BugsBetaController } from './bugs_beta/bugs_beta.controller';
import { BugsBetaModule } from './bugs_beta/bugs_beta.module';
import { ExercisesLibraryModule } from './exercises_library/exercises_library.module';
import { BetaUsersModule } from './beta_users/beta_users.module';
import { MealRecoModule } from './meal_reco/meal_reco.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FeedbackUserModule } from './feedback_user/feedback_user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ThrottlerModule.forRoot({
    ttl: 60,
    limit: 60,
  }), PrismaModule, AuthModule, FormModule, UserInfosModule, MessagesModule, CaloriesModule, StepsModule, MealsModule, ChatModule, ReportsModule, FileModule, ReportsModule, SportsExerciseModule, PreferencesModule, PlanningModule, OpenffModule, BugsBetaModule, ExercisesLibraryModule, BetaUsersModule, MealRecoModule, EventEmitterModule.forRoot(), FeedbackUserModule],
  controllers: [AppController, CaloriesController, MealsController, BugsBetaController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard
  }, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }, CaloriesService, MealsService, BugsBetaService],
})
export class AppModule { }
