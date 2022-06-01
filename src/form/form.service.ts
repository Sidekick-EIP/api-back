import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FormDto } from './dto/form.dto';

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) { }

  public async saveFormDatas(datas: FormDto) {
    console.log(datas);

    //SAVE EN DB
  }
}
