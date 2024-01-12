import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AdminGuard } from '../common/guards';
import { GetCurrentUserEmail } from '../common/decorators';
import { ModeratorAnswerDto } from './dto/moderator-answer.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @GetCurrentUserEmail() email: string) {
    return this.ticketsService.create(createTicketDto, email);
  }

  @UseGuards(AdminGuard)
  @Get()
  find(@Query('cursor', ParseIntPipe) cursor: number = 0) {
    return this.ticketsService.find(cursor);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Post(":id/answer")
  user_answer(@Body() dto: ModeratorAnswerDto, @Param("id", ParseIntPipe) id: number) {
    return this.ticketsService.user_answer(dto, id);
  }

  @UseGuards(AdminGuard)
  @Post(":id/admin/answer")
  answer(@Body() dto: ModeratorAnswerDto, @Param("id", ParseIntPipe) id: number) {
    return this.ticketsService.answer(dto, id);
  }

  @UseGuards(AdminGuard)
  @Post(":id/close")
  close(@Param("id", ParseIntPipe) id: number) {
    return this.ticketsService.close(id);
  }

  @Get("/me")
  getTickets(@GetCurrentUserEmail() email: string) {
    return this.ticketsService.getTickets(email);
  }

  @UseGuards(AdminGuard)
  @Get("admin")
  getTicketsFromEmail(@Query("email") email: string) {
    return this.ticketsService.getTickets(email);
  }

  @UseGuards(AdminGuard)
  @Get("admin")
  getTicketsFromId(@Query("id") id: string) {
    return this.ticketsService.getTicketsFromId(id);
  }
}