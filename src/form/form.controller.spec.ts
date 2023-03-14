import { PrismaService } from '../prisma/prisma.service';
import { FormService } from './form.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormDto } from './dto/form.dto';
import * as argon from 'argon2';

describe('FormController', () => {
  let controller: FormController;
  let service: FormService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [FormService, PrismaService, ConfigService]
    }).compile();

    controller = module.get<FormController>(FormController);
    service = module.get<FormService>(FormService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it("calling saveFormDatas method", async () => {
  //   const hash = await argon.hash("password");
  //   await prisma.user.create({
  //     data: {
  //       email: "test.test@gmail.com",
  //       password: hash,
  //     }
  //   })

  //   const user = await prisma.user.findFirst({
  //     where: {
  //       email: "test.test@gmail.com"
  //     }
  //   })

  //   const dto = new FormDto();

  //   dto.description = "Bonjour";
  //   dto.gender = "MALE",
  //   dto.size = 165;
  //   dto.firstname = "Alexandre";
  //   dto.lastname = "Antoniutti";
  //   dto.weight = 65;
  //   dto.sport_frequence = "NEVER";
  //   dto.userId = user.id;
  //   dto.username = user.email;

  //   jest.spyOn(service, 'saveFormDatas');
  //   await controller.saveFormDatas(dto, user.id);
  //   expect(service.saveFormDatas).toHaveBeenCalled();
  //   expect(service.saveFormDatas).toHaveBeenCalledWith(dto, user.id);


  //   await prisma.userData.delete({where: {
  //     userId: user.id,
  //   }})
  //   await prisma.user.delete({where: {
  //     id: user.id,
  //   }})
  // })
});
