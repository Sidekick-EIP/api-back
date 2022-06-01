import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FormDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsInt()
  size: number;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  sport_frequence: number;
} 