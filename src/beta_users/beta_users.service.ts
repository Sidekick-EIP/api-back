import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BetaUsersDto } from './dto/beta_users.dto';

@Injectable()
export class BetaUsersService {
	constructor(
		private _prismaService: PrismaService,
	) {}

	async add(datas: BetaUsersDto) {
		var alreadyExists = await this._prismaService.betaUser.findUnique({
			where: {
				email: datas.email
			}
		})

		if (alreadyExists) {
			throw new NotFoundException('Beta User with email ' + datas.email + ' already exists.');
		}

		return this._prismaService.betaUser.create({
			data: datas
		});
	}
}
