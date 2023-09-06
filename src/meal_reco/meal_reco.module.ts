import { Module } from '@nestjs/common';
import { MealRecoService } from './meal_reco.service';
import { MealRecoController } from './meal_reco.controller';

@Module({
  controllers: [MealRecoController],
  providers: [MealRecoService]
})
export class MealRecoModule {}
