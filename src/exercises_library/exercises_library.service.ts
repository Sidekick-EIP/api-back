import { Injectable } from '@nestjs/common';
import { CreateExercisesLibraryDto } from './dto/create-exercises_library.dto';
import { UpdateExercisesLibraryDto } from './dto/update-exercises_library.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MuscleGroup } from '@prisma/client';

@Injectable()
export class ExercisesLibraryService {
  constructor(private prisma: PrismaService) { }

  async create(createExercisesLibraryDto: CreateExercisesLibraryDto) {
    const { name, description, video, thumbnail, muscleGroup, met } = createExercisesLibraryDto;

    const exercisesLibrary = await this.prisma.exercises_Library.create({
      data: {
        name,
        description,
        video,
        thumbnail,
        muscle_group: muscleGroup,
        met: met,
      },
    });

    return exercisesLibrary;
  }

  async findAll() {
    const exercisesLibrary = await this.prisma.exercises_Library.findMany();

    return exercisesLibrary;
  }

  async findByMuscle(muscle: MuscleGroup) {
    const exercisesLibrary = await this.prisma.exercises_Library.findMany({
      where: {
        muscle_group: muscle,
      }
    });

    return exercisesLibrary;
  }

  public async findOne(id: number) {
    const exercisesLibrary = await this.prisma.exercises_Library.findUnique({
      where: {
        id,
      },
    });

    return exercisesLibrary;
  }

  async update(id: number, updateExercisesLibraryDto: UpdateExercisesLibraryDto) {
    const { name, description, video, thumbnail, muscleGroup, met } = updateExercisesLibraryDto;

    const exercisesLibrary = await this.prisma.exercises_Library.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        video,
        thumbnail,
        muscle_group: muscleGroup,
        met: met
      },
    });

    return exercisesLibrary;
  }

  async remove(id: number) {
    const exercisesLibrary = await this.prisma.exercises_Library.delete({
      where: {
        id,
      },
    });

    return exercisesLibrary;
  }
}