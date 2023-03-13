import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SportsExerciseDto } from './dto/sports_exercices.dto';
import UserNotFoundException from './exceptions/not-found.exception';

@Injectable()
export class SportsExerciseService {
	constructor(private _prismaService: PrismaService) {}

	public async find(id: string) {
		const exercise = await this._prismaService.sports_exercices.findUnique({
			where: {
				id: Number(id)
			}
		})

		if (!exercise) {
			throw new NotFoundException('No exercise with the id \'' + id + '\' found.')
		} else {
			return exercise
		}
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

		return this._prismaService.sports_exercices.findMany({
			where: {
				userId: user.id,
			}
		})
	}

	public async add(datas: SportsExerciseDto, userEmail: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: userEmail
			}
		});
		if (!user) {
			throw new UserNotFoundException(userEmail);
		}
		
		const exercise = await this._prismaService.sports_exercices.findFirst({
			where: {
				name: datas.name,
				userId: user.id
			}
		});
		if (!exercise) {
			datas.userId = user.id
			return this._prismaService.sports_exercices.create({
				data: datas
			});
		} else {
			throw new ConflictException('An exercise with the name \'' + datas.name + '\' already exist for this user.');
		}
	}

	public async remove(id: string) {
		await this._prismaService.sports_exercices.delete({
			where: {
				id: Number(id)
			},
		})
	}

	public async update(id: string, datas: SportsExerciseDto) {
		return this._prismaService.sports_exercices.update({
			data: datas,
			where: {
				id: Number(id)
			}
		})
	}

	public async search(userEmail: string, pattern: string) {
		const user = await this._prismaService.user.findUnique({
			where: {
				email: userEmail
			}
		});
		if (!user) {
			throw new UserNotFoundException(userEmail);
		}

		return this._prismaService.sports_exercices.findMany({
			where: {
				userId: user.id,
				name: {
					startsWith: pattern,
				}
			}
		})
	}
}
