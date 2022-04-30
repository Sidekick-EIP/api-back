import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module';

const envFilePath = getEnvPath(`${__dirname}`);

@Module({
  imports: [ConfigModule.forRoot({envFilePath, isGlobal: true}), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
