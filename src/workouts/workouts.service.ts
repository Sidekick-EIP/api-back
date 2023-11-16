import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutsDto } from './dto/workouts.dto';
import { ExercisesLibraryService } from '../exercises_library/exercises_library.service';
import UserNotFoundException from './exceptions/not-found.exception';
import { UserInfoService } from '../user_infos/user_infos.service';
import { UserWithoutSidekickException } from 'src/user_infos/exceptions/not-found.exception';

@Injectable()
export class WorkoutsService {
	constructor(private _prismaService: PrismaService) { }

	public async find(id: number) {
		const workout = await this._prismaService.workouts.findUnique({
			include: {
				exercise: true,
			},
			where: {
				id: id
			}
		})
		if (!workout) {
			throw new NotFoundException('No workouts found with the id \'' + id.toString() + '\' found.')
		} else {
			return workout
		}
	}

	public async burnedCalories(email: string, day: string) {
		const workouts = await this.findByDay(email, day);
		return {
			burnedCalories: workouts.reduce((total, workout) => total + workout.burnedCalories, 0)
		};
	}

	public async findByDay(email: string, day: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email
			}
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}

		return this._prismaService.workouts.findMany({
			include: {
				exercise: true,
			},
			where: {
				userId: user.id,
				date: day
			}
		})
	}

	public async findAll(email: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email
			}
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}

		return this._prismaService.workouts.findMany({
			include: {
				exercise: true,
			},
			where: {
				userId: user.id,
			}
		})
	}

	public async findSidekick(email: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: email
			}
		});
		if (!user) {
			throw new UserNotFoundException(email);
		}

		const userDatas = await this._prismaService.userData.findUnique({
			where: {
			  userId: user.id,
			},
		  });
		  if (!userDatas.sidekick_id) {
			throw new UserWithoutSidekickException(user.id);
		  }

		return this._prismaService.workouts.findMany({
			include: {
				exercise: true,
			},
			where: {
				userId: userDatas.sidekick_id,
			}
		})
	}

	public async add(datas: WorkoutsDto, userEmail: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: userEmail
			}
		});
		if (!user) {
			throw new UserNotFoundException(userEmail);
		}
		const exercise = await this._prismaService.exercises_Library.findUnique({ where: { id: datas.exerciseId } });
		const userInfos = await this._prismaService.userData.findUnique({ where: { userId: user.id } });

		const burnedCalories = ((exercise.met * 3.5 * userInfos.weight) / 200) * datas.duration;

		datas.userId = user.id
		return this._prismaService.workouts.create({
			data: {
				userId: datas.userId,
				duration: datas.duration,
				date: datas.date,
				exerciseId: datas.exerciseId,
				burnedCalories: burnedCalories
			},
		});
	}

	public async remove(id: number) {
		await this._prismaService.workouts.delete({
			where: {
				id: id
			},
		})
	}

	public async update(id: number, datas: WorkoutsDto) {
		return this._prismaService.workouts.update({
			data: datas,
			where: {
				id: id
			}
		})
	}
}
