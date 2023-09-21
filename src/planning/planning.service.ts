import { Injectable } from '@nestjs/common';
import { EventCalendar } from "@prisma/client";
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from '../user_infos/exceptions/not-found.exception';

@Injectable()
export class PlanningService {
	constructor(
		private _prismaService: PrismaService,
	) { }



	async setExercise(email: string, req: { day: number, repetitions: number, exercise_id: number }) {
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
					repetitions: req.repetitions
				}
			}
		})
	}

	async updateExercise(req: { day: number, repetitions: number, exercise_id: number }, id: string) {
		return await this._prismaService.planning.update({
			where: {
				id: Number(id)
			},
			data: {
				day: new Date(Number(req.day)),
				type: EventCalendar.SPORTS_EXERCISE,
				content: {
					id: req.exercise_id,
					repetitions: req.repetitions
				}
			}
		})
	}

	async setMeal(email: string, req: { day: number, moment: string, meal_id: number }) {

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

	async updateMeal(req: { day: string, meal_id: number, moment: string }, id: string) {
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

	async getEvent(id: string) {
		return await this._prismaService.planning.findUnique({
			where: {
				id: Number(id)
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

		const targetDate = new Date(Number(day));

		const year = targetDate.getUTCFullYear();
		const month = targetDate.getUTCMonth();
		const dayOfMonth = targetDate.getUTCDate();

		// Créer une plage de temps pour la journée spécifiée (en temps UTC, de minuit à 23:59:59)
		const startOfDay = new Date(Date.UTC(year, month, dayOfMonth, 0, 0, 0));
		const endOfDay = new Date(Date.UTC(year, month, dayOfMonth, 23, 59, 59));
		console.log(startOfDay);
		console.log(endOfDay);

		return await this._prismaService.planning.findMany({
			where: {
				userId: user.id,
				day: {
					gte: startOfDay,
					lte: endOfDay,
				}
			}
		})
	}

	async getAll(email: string) {
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
				userId: user.id
			}
		})
	}
}
