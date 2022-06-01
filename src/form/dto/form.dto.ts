import { Gender, SportFrequence } from './../../../node_modules/.prisma/client/index.d';

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
  @IsInt()
  weight: number;

  @IsNotEmpty()
  @IsInt()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  sport_frequence: SportFrequence;
} 