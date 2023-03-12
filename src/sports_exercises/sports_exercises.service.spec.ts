import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { SportsExerciseDto } from './dto/sports_exercices.dto';
import { SportsExerciseService } from './sports_exercises.service';

describe('SportsExerciseService', () => {
  let service: SportsExerciseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsExerciseService, PrismaService, ConfigService],
    }).compile();

    service = module.get<SportsExerciseService>(SportsExerciseService);
  });

  afterAll(async () => {

  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a exercise', async () => {
  //   const sportsExerciseDto: SportsExerciseDto = {
  //     name: "Pompes",
  //     userId: "",
  //     id: 0
  //   }
  //   return await service.add(sportsExerciseDto, "");
  // })

  // it('should throw a conflict Exception if the exercise already exists', async () => {
  //   const sportsExerciseDto: SportsExerciseDto = {
  //     name: "Pompes",
  //     userId: "",
  //     id: 0
  //   }
  //   expect(async () => await service.add(sportsExerciseDto, "")).toThrowError(
  //     'An exercise with the name \'Pompes\' already exist for this user.'
  //   );
  // })

  // it('should find an exercise with an id', async () => {
  //   const exercise = {
  //     id: 1,
  //     name: "Pompes",
  //     userId: "un id",
  //   }
  //   expect(await service.find("1")).toEqual(exercise);
  // })

  // it('should find all exercise for a user', async () => {
  //   const exercise = [{
  //     id: 1,
  //     name: "Pompes",
  //     userId: "un id",
  //   }, {
  //     id: 2,
  //     name: "Abdos",
  //     userId: "un id",
  //   }]
  //   expect(await service.findAll("email d'un user")).toEqual(exercise);
  // })
});
