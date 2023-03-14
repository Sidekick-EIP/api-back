import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfig } from '../auth/auth.config';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { SportsExerciseDto } from './dto/sports_exercices.dto';
import { SportsExerciseService } from './sports_exercises.service';

describe('SportsExerciseService', () => {
  let service: SportsExerciseService;
  let authService: AuthService;
  let prismaService: PrismaService;
  let id: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsExerciseService, AuthService, PrismaService, AuthConfig, ConfigService],
    }).compile();

    service = module.get<SportsExerciseService>(SportsExerciseService);
    authService = module.get<AuthService>(AuthService);
    prismaService =  module.get<PrismaService>(PrismaService);

    await authService.register({
      email: "jestSport@gmail.com",
      password: "Password123",
    });
    const user = await prismaService.user.findUnique({
			where: {
				email: "jestSport@gmail.com",
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
    await prismaService.sports_exercices.deleteMany({  where: {
      userId: id
    }})
    await authService.delete({
      email: "jestSport@gmail.com",
      password: "Password123",
    });
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a exercise', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 45
    }
    return await service.add(sportsExerciseDto, "jestSport@gmail.com");
  }, 10000)

  it ('should throw a Not found Exception if the user doesnt exist when creating exercise', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 34
    }
    await service.add(sportsExerciseDto, "usernotfound@gmail.com")
    .then((exercise) => expect(exercise).toBeUndefined())
    .catch((err) => expect(err.status).toBe(404));
  }, 10000)

  it('should throw a conflict Exception if the exercise" already exists', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 89
    }
    await service.add(sportsExerciseDto, "jestSport@gmail.com");
    const exercise: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 61
    }
    await service.add(exercise, "jestSport@gmail.com")
    .then((exercise) => expect(exercise).toBeUndefined())
    .catch((err) => expect(err.status).toBe(409));
  }, 10000)

  it('should find an exercise with an id', async () => {
    const exercise = await service.add({name: "Abdos", userId: "", id: 0}, "jestSport@gmail.com")
    expect(await service.find(String(exercise.id))).toEqual(exercise);
    await service.remove(String(exercise.id))
  }, 10000)

  it ('should throw a Not found Exception if the exercise doesnt exist when finding exercise', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 78
    }
    const exercise = await service.add(sportsExerciseDto, "jestSport@gmail.com")

    await service.find(String(172))
    .then((exercise) => expect(exercise).toBeUndefined())
    .catch((err) => expect(err.status).toBe(404));
  }, 10000)

  it('should find all exercise for a user', async () => {
    let exercises = [await service.add({name: "Abdos", userId: "", id: 456}, "jestSport@gmail.com") , await service.add({name: "Pompes", userId: "", id: 457}, "jestSport@gmail.com")]
    expect(await service.findAll("jestSport@gmail.com")).toEqual(exercises);
  }, 10000)

  it ('should throw a Not found Exception if the user doesnt exist when finding all exercises', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 123
    }
    await service.add(sportsExerciseDto, "jestSport@gmail.com")

    await service.findAll("usernotfound@gmail.com")
    .then((exercise) => expect(exercise).toBeUndefined())
    .catch((err) => expect(err.status).toBe(404));
  }, 10000)

  it('should remove an exercise with an id', async () => {
    const exercise = await service.add({name: "Abdos", userId: "", id: 98}, "jestSport@gmail.com")
    await service.remove(String(exercise.id))
    const oldExercise = await prismaService.sports_exercices.findUnique({
      where: {
        id: exercise.id,
      },
    });
    expect(oldExercise).toBeNull();
  }, 10000)

  it('should update an exercise', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 45
    }
    const exercise = await service.add(sportsExerciseDto, "jestSport@gmail.com");
    const newExerciseDto: SportsExerciseDto = {
      name: "Abdos",
      userId: exercise.userId,
      id: exercise.id
    }
    expect((await service.update(String(exercise.id), newExerciseDto)).name).toBe("Abdos")
  }, 10000)

  it('should return entries where name start with pattern', async () => {
    let exercises = [await service.add({name: "Abdos", userId: "", id: 9}, "jestSport@gmail.com") , await service.add({name: "Pompes", userId: "", id: 10}, "jestSport@gmail.com")]

    expect(await service.search("jestSport@gmail.com", "Ab")).toEqual([exercises[0]]);
    expect(await service.search("jestSport@gmail.com", "Z")).toEqual([]);
    let exercises2 = [await service.add({name: "Pushup", userId: "", id: 11}, "jestSport@gmail.com") , await service.add({name: "Pull", userId: "", id: 12}, "jestSport@gmail.com")]
    
    expect(await service.search("jestSport@gmail.com", "P")).toEqual([exercises[1], exercises2[0], exercises2[1]]);
  }, 10000)

  it('should throw a Not found Exception if the user doesnt exist when searching for exercises', async () => {
    const sportsExerciseDto: SportsExerciseDto = {
      name: "Pompes",
      userId: "",
      id: 56
    }
    await service.add(sportsExerciseDto, "jestSport@gmail.com")

    await service.search("usernotfound@gmail.com", "P")
    .then((exercise) => expect(exercise).toBeUndefined())
    .catch((err) => expect(err.status).toBe(404));
  }, 10000)
});