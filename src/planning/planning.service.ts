import { Injectable } from '@nestjs/common';
import { EventCalendar } from "@prisma/client";
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from '../user_infos/exceptions/not-found.exception';

@Injectable()
export class PlanningService {
	constructor(
		private _prismaService: PrismaService,
	) {}

	async setExercise(email: string, req: { day: number, repetitions: number, exercise_id: number, moment: string}) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}
		return await this._prismaService.planning.create({
			data: {
				userId: user.id,
				day: new Date(Number(req.day)),
				type: EventCalendar.SPORTS_EXERCISE,
				content: {
					id: req.exercise_id,
					moment: req.moment,
					repetitions: req.repetitions
				}
			}
		})
	}

	async updateExercise(req: { day: string, repetitions: number, exercise_id: number, moment: string}, id: string) {
		return await this._prismaService.planning.update({
			where: {
				id: Number(id)
			},
			data: {
				day: new Date(Number(req.day)),
				type: EventCalendar.SPORTS_EXERCISE,
				content: {
					id: req.exercise_id,
					moment: req.moment,
					repetitions: req.repetitions
				}
			}
		})
	}

	async setMeal(email: string, req: { day: number, moment: string, meal_id: number;}) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}
		return await this._prismaService.planning.create({
			data: {
				userId: user.id,
				day: new Date(Number(req.day)),
				type: EventCalendar.MEAL,
				content: {
					id: req.meal_id,
					moment: req.moment,
				}
			}
		})
	}

	async updateMeal(req: { day: string, meal_id: number, moment: string}, id: string) {
		return await this._prismaService.planning.update({
			where: {
				id: Number(id)
			},
			data: {
				day: new Date(Number(req.day)),
				type: EventCalendar.MEAL,
				content: {
					id: req.meal_id,
					moment: req.moment,
				}
			}
		})
	}


	async deleteEvent(id: string) {
		return await this._prismaService.planning.delete({
			where: {
				id: Number(id)
			}
		})
	}
	async deletePlanningByDay(email: string, day: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}
		return await this._prismaService.planning.deleteMany({
			where: {
				day: new Date(Number(day))
			}
		})
	}
	async getPlanningByDay(email: string, day: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}
		return await this._prismaService.planning.findMany({
			where: {
				day: new Date(Number(day))
			}
		})
	}
}
