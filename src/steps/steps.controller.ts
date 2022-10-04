import { Controller, Get, Query, Request } from "@nestjs/common";
import { StepsService } from "./steps.service";

@Controller()
export class StepsController {
  constructor(private stepsService: StepsService) {}

  @Get("steps")
  getCalories(@Request() req: any) {
    return this.stepsService.getStepsById(req.user.email);
  }
}