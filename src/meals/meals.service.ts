import { MealsDto } from './dto/meals.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from './exceptions/not-found.exception';
import { UpdateMealsDto } from './dto/update.dto';


@Injectable()
export class MealsService {
	constructor(private _prismaService: PrismaService) {}

  public async delete(id: string) {
		await this._prismaService.meals.delete({
		  where: {
        id: Number(id)
		  },
		})
  }

	public async add(datas: MealsDto, userEmail: string) {
    var newDatas = datas;

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
    newDatas['date'] = new Date(datas.date)

    //Create the meal
    return this._prismaService.meals.create({
			data: newDatas
		});
  }

  public async update(datas: UpdateMealsDto, id: string) {
    var newDatas = datas
    newDatas['date'] = new Date(datas.date)

    //Update the meal that we need to modify
    return this._prismaService.meals.update({
      data: datas,
      where: {
        id: Number(id)
      }
    })
  }

  public async find(userEmail: string, pattern: string) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail
      }
    });
    if (!user) {
        throw new UserNotFoundException(userEmail);
    }

    return this._prismaService.meals.findMany({
      where: {
        userId: user.id,
        name: {
          startsWith: pattern,
        }
      }
    })
  }

  public async findByDay(userEmail: string, date: string) {
     //Get User with email
		const user = await this._prismaService.user.findUnique({
      where: {
        email: userEmail
      }
    });
    if (!user) {
        throw new UserNotFoundException(userEmail);
    }

    var formattedDate = new Date(date)
    return this._prismaService.meals.findMany({
      where: {
        userId: user.id,
        date: formattedDate
      }
    })
  }
}