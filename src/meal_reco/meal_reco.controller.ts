import { Body, Controller, Get, Post } from '@nestjs/common';
import { MealRecoService } from './meal_reco.service';
import { GetCurrentUserEmail, Public } from 'src/common/decorators';
import { Throttle } from '@nestjs/throttler';
import { MealRecoDto } from './dto/meal_reco.dto';

@Controller('meal-reco')
export class MealRecoController {
  constructor(private readonly mealRecoService: MealRecoService) { }

  @Post()
  @Throttle(1, 60)
  mealReco(@Body() body: MealRecoDto, @GetCurrentUserEmail() email: string) {
    return this.mealRecoService.mealReco(body.user_needs, body.goal, email);
  }
}
