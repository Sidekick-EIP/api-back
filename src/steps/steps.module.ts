import { Module } from '@nestjs/common';
import { StepsService } from "./steps.service";
import { StepsController } from "./steps.controller";

@Module({
  providers: [StepsService],
  controllers: [StepsController],
})
export class StepsModule {}
