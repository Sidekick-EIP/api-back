import { MealsDto } from './dto/meals.dto';
import { Injectable } from '@nestjs/common';
import { Gender, SportFrequence } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from '../user_infos/exceptions/not-found.exception';


@Injectable()
export class MealsService {
	constructor(private _prismaService: PrismaService) {}

    public async removeMeal(userEmail: string) {
		const user = await this._prismaService.user.findUnique({
      where: {
          email: userEmail
      }
    });
    if (!user) {
        throw new UserNotFoundException(user.id);
    }
		await this._prismaService.meals.delete({
		  where: {
			  userId: user.id
		  },
		})
  }

	public async addMeal(datas: MealsDto, userEmail: string) {
    var newDatas = datas;

		const user = await this._prismaService.user.findUnique({
            where: {
                email: userEmail
            }
        });
        if (!user) {
            throw new UserNotFoundException(userEmail);
        }
		newDatas['userId'] = user.id
    newDatas['date'] = new Date(datas.date)
		return this._prismaService.meals.create({
			data: newDatas
		});
  }
}
