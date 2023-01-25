import { Gender, SportFrequence } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator'; 

export class FormDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

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
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  sport_frequence: SportFrequence;
} 