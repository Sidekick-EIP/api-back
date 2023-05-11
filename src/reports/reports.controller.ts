import { Body, Controller, Post } from "@nestjs/common";
import { GetCurrentUserEmail } from "../common/decorators/current_user.decorator";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(
    @GetCurrentUserEmail() currentUser: string,
    @Body("reason") reason: string
  ) {
    return this.reportsService.create(currentUser, reason);
  }

  @Post("change")
  async change(
    @GetCurrentUserEmail() currentUser: string
  ) {
    return this.reportsService.change(currentUser);
  }
}
