import { PartialType } from '@nestjs/mapped-types';
import { CreateExercisesLibraryDto } from './create-exercises_library.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExercisesLibraryDto extends PartialType(CreateExercisesLibraryDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
