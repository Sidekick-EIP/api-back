import { Body, Controller, Post } from "@nestjs/common";
import { GetCurrentUserId } from "../common/decorators/current_user.decorator";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: string,
    @Body("reason") reason: string
  ) {
    console.log(userId);
    return this.reportsService.create(userId, reason);
  }
}
