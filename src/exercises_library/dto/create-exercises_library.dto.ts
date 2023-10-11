import { MuscleGroup } from "@prisma/client";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExercisesLibraryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  video: string;

  @IsOptional()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  muscleGroup: MuscleGroup;

  @IsNotEmpty()
  @IsInt()
  met: number;
}
