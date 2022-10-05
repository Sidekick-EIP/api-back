import { Module } from '@nestjs/common';
import { StepsService } from "./steps.service";
import { StepsController } from "./steps.controller";
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [StepsService, PrismaService],
  controllers: [StepsController],
})
export class StepsModule {}
