import { Controller, Get, Post, Query, Body, Delete, Put } from '@nestjs/common';
import { GetCurrentUserEmail } from '../common/decorators';
import { PlanningService } from './planning.service';

@Controller('planning')
export class PlanningController {
	constructor(private planningService: PlanningService) { }

	@Get('planning')
	async getPlanningByDay(@GetCurrentUserEmail() email: string, @Query('day') day: string) {
		return this.planningService.getPlanningByDay(email, day)
	}

	@Delete('planning')
	async deletePlanningByDay(@GetCurrentUserEmail() email: string, @Query('day') day: string) {
		return this.planningService.deletePlanningByDay(email, day)
	}

	@Post('/exercise/create')
	async setSportsExercises(@GetCurrentUserEmail() email: string, @Body() req: {day: string, repetitions: number, exercise_id: number, moment: string}) {
		return this.planningService.setSportsExercises(email, req)
	}

	@Put('/exercise/delete')
	async deleteSportsExercises(@GetCurrentUserEmail() email: string, @Body() req: {day: string, exercise_id: number, moment: string}) {
		return this.planningService.deleteSportsExercise(email, req)
	}

	@Put('/exercise/update')
	async updateSportExercise(@GetCurrentUserEmail() email: string, @Body() req: {day: string, repetitions: number, exercise_id: number, moment: string}) {
		return this.planningService.updateSportExercise(email, req)
	}
}
