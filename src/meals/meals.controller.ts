import { MealsDto } from './dto/meals.dto';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
	constructor(private mealsService: MealsService) { }

    @Post("addMeal")
    addMeal(@Request() req: any, @Body() dto: MealsDto) {
      return this.mealsService.addMeal(dto, req.user.email);
    }

    @Post("modifyMeal")
    modifyMeal(@Body() dto: MealsDto) {
      return this.mealsService.modifyMeal(dto);
    }

    @Post("removeMeal")
    removeMeal(@Body() mealId: {id: number}) {
      return this.mealsService.removeMeal(mealId);
    }

    @Post("searchMeal")
    searchMeal(@Request() req: any, @Body() meal: {pattern: string}) {
      return this.mealsService.searchMeal(req.user.email, meal.pattern);
    }

    @Post("getMealsForOneDay")
    getMealsForOneDay(@Request() req: any, @Body() mealDate: {date: string}) {
      return this.mealsService.getMealsForOneDay(req.user.email, mealDate.date);
    }
}
