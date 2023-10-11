import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfig } from '../auth/auth.config';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutsDto } from './dto/workouts.dto';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsController', () => {
  let controller: WorkoutsController;
  let service: WorkoutsService;
  let authService: AuthService;
  let prismaService: PrismaService;
  let id: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [WorkoutsService, AuthService, AuthConfig, PrismaService, ConfigService]
    }).compile();

    controller = module.get<WorkoutsController>(WorkoutsController);
    service = module.get<WorkoutsService>(WorkoutsService);
    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    await authService.register({
      email: "jestSportController@gmail.com",
      password: "Password123",
    });
    const user = await prismaService.user.findUnique({
      where: {
        email: "jestSportController@gmail.com",
      }
    });
    id = user.id
  });

  beforeEach(async () => {
    await prismaService.sports_exercices.deleteMany({
      where: {
        userId: id
      }
    })
  })

  afterAll(async () => {
    await prismaService.sports_exercices.deleteMany({
      where: {
        userId: id
      }
    })
    await authService.delete({
      email: "jestSportController@gmail.com",
      password: "Password123",
    });
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the findAll method of the service', async () => {
    const spy = jest.spyOn(service, 'findAll');
    await controller.findAll({ user: { email: 'jestSportController@gmail.com' } });

    expect(spy).toHaveBeenCalledWith('jestSportController@gmail.com');
  });

  it('should call the find method of the service', async () => {
    const spy = jest.spyOn(service, 'find');
    const workoutsDto: WorkoutsDto = {
      name: "Pompes",
      userId: "",
      id: 311
    }
    await controller.add({ user: { email: 'jestSportController@gmail.com' } }, workoutsDto);
    await controller.find("311")

    expect(spy).toHaveBeenCalledWith("311");
  });

  it('should call the add method of the service', async () => {
    const spy = jest.spyOn(service, 'add');
    const workoutsDto: WorkoutsDto = {
      name: "Pompes",
      userId: "",
      id: 65
    }
    await controller.add({ user: { email: 'jestSportController@gmail.com' } }, workoutsDto);

    expect(spy).toHaveBeenCalledWith(workoutsDto, 'jestSportController@gmail.com');
  });

  it('should call the delete method of the service', async () => {
    const spy = jest.spyOn(service, 'remove');
    const workoutsDto: WorkoutsDto = {
      name: "Pompes",
      userId: "",
      id: 91
    }
    await controller.add({ user: { email: 'jestSportController@gmail.com' } }, workoutsDto);
    await controller.remove("91")

    expect(spy).toHaveBeenCalledWith("91");
  });

  it('should call the delete method of the service', async () => {
    const spy = jest.spyOn(service, 'search');
    const workoutsDto: WorkoutsDto = {
      name: "Pompes",
      userId: "",
      id: 91
    }
    await controller.add({ user: { email: 'jestSportController@gmail.com' } }, workoutsDto);
    await controller.search({ user: { email: 'jestSportController@gmail.com' } }, "P")

    expect(spy).toHaveBeenCalledWith('jestSportController@gmail.com', "P");
  });


  it('should call the update method of the service', async () => {
    const spy = jest.spyOn(service, 'update');
    const workoutsDto: WorkoutsDto = {
      name: "Pompes",
      userId: "",
      id: 245
    }
    const exercise = await controller.add({ user: { email: 'jestSportController@gmail.com' } }, workoutsDto);
    const newWorkoutsDto: WorkoutsDto = {
      name: "Abdos",
      userId: exercise.userId,
      id: 245
    }
    await controller.update(String(exercise.id), newWorkoutsDto)
    expect(spy).toHaveBeenCalledWith(String(exercise.id), newWorkoutsDto);
  });
});
