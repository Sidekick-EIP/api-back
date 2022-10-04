import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserNotFoundException from "../user_infos/exceptions/not-found.exception";

@Injectable()
export class StepsService {
  constructor(private _prismaService: PrismaService) {}

  public async getStepsById(userEmail: string) {
    const userSteps = await this._prismaService.user.findUnique({
      where: {
        email: userEmail
      }
    })
    if (!userSteps) {
      throw new UserNotFoundException(userEmail);
    }

    const user = await this._prismaService.userData.findUnique({
      where: {
        userId: userSteps.id
      }
    });
    if (!user) {
      throw new UserNotFoundException(userEmail);
    }

    const step_data =  await this._prismaService.steps.findMany({
      where: {
        userId: userSteps.id
      }
    });

    return {
      data: step_data
    }
  }
}
