import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import UserNotFoundException from "../user_infos/exceptions/not-found.exception";
import { CreateFeedbackUserDto } from "./dto/create-feedback_user.dto";
import { UpdateFeedbackUserDto } from "./dto/update-feedback_user.dto";

@Injectable()
export class FeedbackUserService {
  constructor(
    private _prismaService: PrismaService,
  ) {}

  async getAll() {
    return await this._prismaService.feedBackUser.findMany();
  }

  async getById(id: string) {
    return await this._prismaService.feedBackUser.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  async add(feedback: CreateFeedbackUserDto, userEmail: string) {
    var newDatas = feedback;

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

    return this._prismaService.feedBackUser.create({
      data: newDatas
    });
  }

  async update(feedback: UpdateFeedbackUserDto, id: string) {
    //Update the meal that we need to modify
    return this._prismaService.feedBackUser.update({
      data: feedback,
      where: {
        id: Number(id)
      }
    })
  }

  async delete(id: string) {
    return await this._prismaService.feedBackUser.delete({
      where: {
        id: Number(id)
      }
    });
  }
}

