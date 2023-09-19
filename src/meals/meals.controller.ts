import { MealsDto } from './dto/meals.dto';
import { Body, Controller, Get, Delete, Put,  Post, Request, Query, Param } from '@nestjs/common';
import { MealsService } from './meals.service';
import { UpdateMealsDto } from './dto/update.dto';

@Controller('meals')
export class MealsController {
	constructor(private mealsService: MealsService) { }

    @Post("/")
    addMeal(@Request() req: any, @Body() dto: MealsDto) {
      return this.mealsService.add(dto, req.user.email);
    }

    @Get("findAll")
    getAllMeals(@Request() req: any) {
      return this.mealsService.findAll(req.user.email);
    }

    @Get("findByDay")
    getMealsForOneDay(@Request() req: any, @Query('day') day: string) {
      return this.mealsService.findByDay(req.user.email, day);
    }

    @Get("/:id")
    getMeal(@Param('id') id: string) {
      return this.mealsService.findOne(id);
    }

    @Put("/:id")
    modifyMeal(@Param('id') id: string, @Body() dto: UpdateMealsDto) {
      return this.mealsService.update(dto, id);
    }

    @Delete("/:id")
    removeMeal(@Param('id') id: string) {
      return this.mealsService.delete(id);
    }

    @Post("find")
    searchMeal(@Request() req: any, @Body("pattern") pattern: string) {
      return this.mealsService.find(req.user.email, pattern);
    }
}
