import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanningService {
	updateSportExercise(email: string, req: { day: string; repetitions: number; exercise_id: number; moment: string; }) {
		throw new Error('Method not implemented.');
	}
	deleteSportsExercise(email: string, req: { day: string; exercise_id: number; moment: string; }) {
		throw new Error('Method not implemented.');
	}
	setSportsExercises(email: string, req: { day: string; repetitions: number; exercise_id: number; moment: string; }) {
		throw new Error('Method not implemented.');
	}
	deletePlanningByDay(email: string, day: string) {
		throw new Error('Method not implemented.');
	}
	getPlanningByDay(email: string, day: string) {
		throw new Error('Method not implemented.');
	}
}
