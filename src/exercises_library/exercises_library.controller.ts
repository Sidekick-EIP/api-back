import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExercisesLibraryService } from './exercises_library.service';
import { CreateExercisesLibraryDto } from './dto/create-exercises_library.dto';
import { UpdateExercisesLibraryDto } from './dto/update-exercises_library.dto';
import { Public } from 'src/common/decorators';

@Controller('exercises-library')
export class ExercisesLibraryController {
  constructor(private readonly exercisesLibraryService: ExercisesLibraryService) {}

  @Public()
  @Post()
  create(@Body() createExercisesLibraryDto: CreateExercisesLibraryDto) {
    return this.exercisesLibraryService.create(createExercisesLibraryDto);
  }

  @Get()
  findAll() {
    return this.exercisesLibraryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesLibraryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExercisesLibraryDto: UpdateExercisesLibraryDto) {
    return this.exercisesLibraryService.update(+id, updateExercisesLibraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesLibraryService.remove(+id);
  }
}
