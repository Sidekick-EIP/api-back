import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { FormModule } from './form/form.module';

const envFilePath = getEnvPath(`${__dirname}`);

@Module({
  imports: [ConfigModule.forRoot({envFilePath, isGlobal: true}), PrismaModule, AuthModule, FormModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AtGuard
  }],
})
export class AppModule {}
