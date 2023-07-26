import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Page } from '@prisma/client';
import UserNotFoundException from '../user_infos/exceptions/not-found.exception';
import { BugsBetaDto } from './dto/bugs_beta.dto';
import { UpdateBugsBetaDto } from './dto/update.dto';


@Injectable()
export class BugsBetaService {
	constructor(
		private _prismaService: PrismaService,
	) {}
	
	async getAll() {
		return await this._prismaService.bugsBeta.findMany();
	}

	async getById(id: string) {
		return await this._prismaService.bugsBeta.findUnique({
			where: {
				id: Number(id)
			}
		});
	}

	async getByPage(page: string) {
		var enumPage = Page[page];
		console.log(enumPage);
		return await this._prismaService.bugsBeta.findMany({
			where: {
				page: enumPage
			}
		});
	}

	async add(bugBeta: BugsBetaDto, userEmail: string) {
		var newDatas = bugBeta;

		//Get User with email
		const user = await this._prismaService.user.findUnique({
		  where: {
			email: userEmail
		  }
		});
		if (!user) {
			throw new UserNotFoundException(userEmail);
		}
	
		newDatas['userId'] = user.id
		newDatas['page'] = Page[bugBeta.page]
	
		return this._prismaService.bugsBeta.create({
			data: newDatas
		});
	}

	async update(bugBeta: UpdateBugsBetaDto, id: string) {
		//Update the meal that we need to modify
		return this._prismaService.bugsBeta.update({
			data: bugBeta,
			where: {
				id: Number(id)
			}
		})
	}

	async delete(id: string) {
		return await this._prismaService.bugsBeta.delete({
			where: {
				id: Number(id)
			}
		});
	}
}
