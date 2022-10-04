import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from "../user_infos/exceptions/not-found.exception";

@Injectable()
export class CaloriesService {
  constructor(private _prismaService: PrismaService) {}

  public async getCaloriesById(userEmail: string) {
    const userCalories = await this._prismaService.user.findUnique({
      where: {
        email: userEmail
      }
    })
    if (!userCalories) {
      throw new UserNotFoundException(userEmail);
    }

    const user = await this._prismaService.userData.findUnique({
      where: {
        userId: userCalories.id
      }
    });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }

    const calory_data =  await this._prismaService.calories.findMany({
      where: {
        userId: userCalories.id
      }
    });

    return {
      data: calory_data
    }
  }
}
