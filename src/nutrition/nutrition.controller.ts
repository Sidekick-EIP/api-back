import { NutritionDto } from './dto/nutrition.dto';
import { UpdateNutritionDto } from './dto/update.dto';
import { Body, Controller, Get, Delete, Put, Post, Request, Query, Param } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Controller('nutrition')
export class NutritionController {
  constructor(private nutritionService: NutritionService) { }

  @Post("/")
  addMeal(@Request() req: any, @Body() dto: NutritionDto) {
    return this.nutritionService.add(dto, req.user.email);
  }

  @Get("findAll")
  getAllNutrition(@Request() req: any) {
    return this.nutritionService.findAll(req.user.email);
  }

  @Get("findByDay")
  getNutritionForOneDay(@Request() req: any, @Query('day') day: string) {
    return this.nutritionService.findByDay(req.user.email, day);
  }

  @Get("/:id")
  getMeal(@Param('id') id: string) {
    return this.nutritionService.findOne(Number(id));
  }

  @Put("/:id")
  modifyMeal(@Param('id') id: string, @Body() dto: UpdateNutritionDto) {
    return this.nutritionService.update(dto, Number(id));
  }

  @Delete("/:id")
  removeMeal(@Param('id') id: string) {
    return this.nutritionService.delete(Number(id));
  }
}
