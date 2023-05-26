import { Module } from '@nestjs/common';
import { AlgoMatchingService } from './algo-matching.service';
import { AlgoMatchingController } from './algo-matching.controller';

@Module({
  controllers: [AlgoMatchingController],
  providers: [AlgoMatchingService]
})
export class AlgoMatchingModule {}
