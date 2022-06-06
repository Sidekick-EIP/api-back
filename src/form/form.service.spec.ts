import { FormController } from './form.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { FormService } from './form.service';
import * as argon from 'argon2';
import { FormDto } from './dto';

describe('FormService', () => {
  let service: FormService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      providers: [FormService, PrismaService, ConfigService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService); 
    service = module.get<FormService>(FormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call saveFormDatas method with expected params', async () => {
    const createFormDatas = jest.spyOn(service, 'saveFormDatas');
    const dto = new FormDto();
    
    const hash = await argon.hash("password");
    await prisma.user.create({
      data: {
        email: "test.test@gmail.com",
        password: hash,
      }
    })

    const user = await prisma.user.findFirst({
      where: {
        email: "test.test@gmail.com"
      }
    })

    dto.description = "Bonjour";
    dto.gender = "MALE",
    dto.size = 165;
    dto.firstname = "Alexandre";
    dto.lastname = "Antoniutti";
    dto.weight = 65;
    dto.userId = user.id;
    dto.sport_frequence = "NEVER";


    await service.saveFormDatas(dto);
    expect(createFormDatas).toHaveBeenCalledWith(dto);

    await prisma.userData.findFirst({
      where: {
        description: "Bonjour",
      }
    })

    await prisma.userData.delete({where: {
      userId: user.id,
    }})
    await prisma.user.delete({where: {
      id: user.id,
    }})
  });
});
