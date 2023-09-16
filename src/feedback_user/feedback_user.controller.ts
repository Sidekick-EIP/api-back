import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put, Query } from "@nestjs/common";
import { FeedbackUserService } from './feedback_user.service';
import { CreateFeedbackUserDto } from './dto/create-feedback_user.dto';
import { UpdateFeedbackUserDto } from './dto/update-feedback_user.dto';

@Controller('feedback-user')
export class FeedbackUserController {
  constructor(private readonly feedbackUserService: FeedbackUserService) {}

  @Post("/")
  addFeedback(@Request() req: any, @Body() dto: CreateFeedbackUserDto) {
    return this.feedbackUserService.add(dto, req.user.email);
  }

  @Put("/:id")
  modifyFeedback(@Param('id') id: string, @Body() dto: UpdateFeedbackUserDto) {
    return this.feedbackUserService.update(dto, id);
  }

  @Delete("/:id")
  removeFeedback(@Param('id') id: string) {
    return this.feedbackUserService.delete(id);
  }

  @Get("/")
  getAll() {
    return this.feedbackUserService.getAll();
  }

  @Get("/:id")
  getById(@Param('id') id: string) {
    return this.feedbackUserService.getById(id);
  }
}
