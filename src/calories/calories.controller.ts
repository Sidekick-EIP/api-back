import { Controller, Get, Query, Request } from "@nestjs/common";
import { CaloriesService } from "./calories.service";

@Controller()
export class CaloriesController {
  constructor(private caloriesService: CaloriesService) {}

  @Get("calories")
  getCalories(@Request() req: any) {
    return this.caloriesService.getCaloriesById(req.user.email);
  }
}