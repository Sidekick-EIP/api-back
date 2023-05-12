import { Module } from '@nestjs/common';
import { OpenffService } from './openff.service';
import { OpenffController } from './openff.controller';

@Module({
  controllers: [OpenffController],
  providers: [OpenffService]
})
export class OpenffModule {}
