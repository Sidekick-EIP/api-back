import { Controller, Get, Post, Query, Body, Delete, Put, Param } from '@nestjs/common';
import { GetCurrentUserEmail } from "../common/decorators/current_user.decorator";
import { PlanningService } from './planning.service';

@Controller('planning')
export class PlanningController {
	constructor(private planningService: PlanningService) { }

	@Get('/all')
	async getAll(@GetCurrentUserEmail() email: string) {
		return this.planningService.getAll(email)
	}

	@Get('/')
	async getPlanningByDay(@GetCurrentUserEmail() email: string, @Query('day') day: string) {
		return this.planningService.getPlanningByDay(email, day)
	}

	@Delete('/')
	async deletePlanningByDay(@GetCurrentUserEmail() email: string, @Query('day') day: string) {
		return this.planningService.deletePlanningByDay(email, day)
	}

	@Post('/exercise/')
	async setSportsExercises(@GetCurrentUserEmail() email: string, @Body() req: {day: number, repetitions: number, exercise_id: number, moment: string}) {
		return this.planningService.setExercise(email, req)
	}

	@Put('/exercise/:id')
	async updateSportExercise(@Param('id') id: string, @GetCurrentUserEmail() email: string, @Body() req: {day: string, repetitions: number, exercise_id: number, moment: string}) {
		return this.planningService.updateExercise(req, id)
	}

	@Post('/meal/')
	async SetMeal(@GetCurrentUserEmail() email: string, @Body() req: {day: number, meal_id: number, moment: string}) {
		return this.planningService.setMeal(email, req)
	}

	@Put('/meal/:id')
	async updateMeal(@Param('id') id: string, @GetCurrentUserEmail() email: string, @Body() req: {day: string, meal_id: number, moment: string}) {
		return this.planningService.updateMeal(req, id)
	}

	@Get('/:id')
	async getEvent(@Param('id') id: string) {
		return this.planningService.getEvent(id)
	}

	@Delete('/:id')
	async deleteEvent(@Param('id') id: string) {
		return this.planningService.deleteEvent(id)
	}
}
