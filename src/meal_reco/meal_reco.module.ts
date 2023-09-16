import { Module } from '@nestjs/common';
import { MealRecoService } from './meal_reco.service';
import { MealRecoController } from './meal_reco.controller';
import { UserInfosModule } from '../user_infos/user_infos.module';

@Module({
  imports: [UserInfosModule],
  controllers: [MealRecoController],
  providers: [MealRecoService]
})
export class MealRecoModule { }
