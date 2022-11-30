import { MealsDto } from './dto/meals.dto';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { MealsService } from './meals.service';
import { Public } from 'src/common/decorators';

@Controller('meals')
export class MealsController {
	constructor(private mealsService: MealsService) { }

    @Post("addMeal")
    addMeal(@Request() req: any, @Body() dto: MealsDto) {
      return this.mealsService.addMeal(dto, req.user.email);
    }

    @Post("removeMeal")
    removeMeal(@Request() req: any) {
      return this.mealsService.removeMeal(req.user.email);
    }
}
