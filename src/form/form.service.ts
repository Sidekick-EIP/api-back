import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormDto } from './dto/form.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { kill } from 'process';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) { }

  public async saveFormDatas(datas: FormDto, userId: string) {
    const res = await this.prisma.userData.create({
      data: datas
    }).catch(error => {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials incorrect');
        }
      }
      throw error;
    });
  }
}
