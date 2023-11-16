import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AdminGuard } from '../common/guards';
import { GetCurrentUserEmail } from '../common/decorators';
import { ModeratorAnswerDto } from './dto/moderator-answer.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @GetCurrentUserEmail() email: string) {
    return this.ticketsService.create(createTicketDto, email);
  }

  @UseGuards(AdminGuard)
  @Get()
  find(cursor: number) {
    return this.ticketsService.find(cursor);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Post(":id/answer")
  answer(@Body() dto: ModeratorAnswerDto, @Param("id", ParseIntPipe) id: number) {
    return this.ticketsService.answer(dto, id);
  }

  @UseGuards(AdminGuard)
  @Post(":id/close")
  close(@Param("id", ParseIntPipe) id: number) {
    return this.ticketsService.close(id);
  }
}