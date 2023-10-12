import { NutritionDto } from './dto/nutrition.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from './exceptions/not-found.exception';
import { UpdateNutritionDto } from './dto/update.dto';

@Injectable()
export class NutritionService {
  constructor(private _prismaService: PrismaService) { }

  public async findAll(userEmail: string) {
    const user = await this._prismaService.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }

    return await this._prismaService.nutrition.findMany({ where: { userId: user.id } })
  }

  public async findOne(id: number) {
    return await this._prismaService.nutrition.findUnique({ where: { id: id } })
  }

  public async add(datas: NutritionDto, userEmail: string) {
    const user = await this._prismaService.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }
    datas.userId = user.id

    return this._prismaService.nutrition.create({
      data: datas
    });
  }

  public async update(datas: UpdateNutritionDto, id: number) {
    return this._prismaService.nutrition.update({
      data: datas,
      where: { id: id }
    })
  }

  public async delete(id: number) {
    await this._prismaService.nutrition.delete({ where: { id: id } })
  }

  public async findByDay(userEmail: string, date: string) {
    const user = await this._prismaService.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }

    const nutrition = await this._prismaService.nutrition.findMany({ where: { userId: user.id, date: date } })
    const breakfasts = await this._prismaService.nutrition.findMany({ where: { userId: user.id, date: date, period: "BREAKFAST" } })
    const lunch = await this._prismaService.nutrition.findMany({where: { userId: user.id, date: date, period: "LUNCH" }})
    const dinners = await this._prismaService.nutrition.findMany({where: { userId: user.id, date: date, period: "DINNER" }})
    const snacks = await this._prismaService.nutrition.findMany({where: { userId: user.id, date: date, period: "SNACKS" }})

    return {
			calories: nutrition.reduce((total, workout) => total + workout.calories, 0),
      carbs: nutrition.reduce((total, workout) => total + workout.carbs, 0),
      protein: nutrition.reduce((total, workout) => total + workout.protein, 0),
      fat: nutrition.reduce((total, workout) => total + workout.fat, 0),
      meals: {
        breakfast: breakfasts,
        lunch: lunch,
        dinners: dinners,
        snacks: snacks
      }
    }
  }
}