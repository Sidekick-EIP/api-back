import { Controller, Post, Request, Body, Param, Delete, Put, Get, Query } from '@nestjs/common';
import { WorkoutsDto } from './dto/workouts.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
	constructor(private workoutsService: WorkoutsService) { }

	@Get("/all")
	findAllAdmin() {
		return this.workoutsService.findAllAdmin();
	}

	@Get("/day")
	findByDay(@Request() req: any, @Query('day') day: string) {
		return this.workoutsService.findByDay(req.user.email, day);
	}

	@Get("/calories")
	burnedCalories(@Request() req: any, @Query('day') day: string) {
		return this.workoutsService.burnedCalories(req.user.email, day);
	}

	@Get("/sidekick")
	findSidekick(@Request() req: any) {
		return this.workoutsService.findSidekick(req.user.email);
	}

	@Get("/:id")
	find(@Param('id') id: string) {
		return this.workoutsService.find(Number(id));
	}

	@Get("/")
	findAll(@Request() req: any) {
		return this.workoutsService.findAll(req.user.email);
	}


	@Post("add")
	add(@Request() req: any, @Body() dto: WorkoutsDto) {
		return this.workoutsService.add(dto, req.user.email);
	}

	@Put("update/:id")
	update(@Param('id') id: string, @Body() dto: WorkoutsDto) {
		return this.workoutsService.update(Number(id), dto);
	}

	@Delete("remove/:id")
	remove(@Param('id') id: string) {
		return this.workoutsService.remove(Number(id));
	}
}
