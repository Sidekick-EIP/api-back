import { Controller, Post, Request, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { SportsExerciseDto } from './dto/sports_exercices.dto';
import { SportsExerciseService } from './sports_exercises.service';

@Controller('sports-exercise')
export class SportsExerciseController {
	constructor(private sportsExercicseService: SportsExerciseService) { }

	@Get("/:id")
	find(@Param('id') id: string) {
		return this.sportsExercicseService.find(id);
	}
	
	@Get("/")
	findAll(@Request() req: any) {
		return this.sportsExercicseService.findAll(req.user.email);
	}

	@Post("add")
	add(@Request() req: any, @Body() dto: SportsExerciseDto) {
	  return this.sportsExercicseService.add(dto, req.user.email);
	}

	@Put("update/:id")
	update(@Param('id') id: string, @Body() dto: SportsExerciseDto) {
		return this.sportsExercicseService.update(id, dto);
	}

	@Delete("remove/:id")
	remove(@Param('id') id: string) {
		return this.sportsExercicseService.remove(id);
	}

	@Post("search")
	search(@Request() req: any, @Body("pattern") pattern: string) {
		return this.sportsExercicseService.search(req.user.email, pattern);
	}
}
