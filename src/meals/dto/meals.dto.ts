import { Calories } from './../../../node_modules/.prisma/client/index.d';
import {Gender, SportFrequence} from '@prisma/client';
import {IsArray, IsDate, IsInt, IsJSON, IsNotEmpty, IsString} from 'class-validator';

export class MealsDto {
    @IsInt()
    proteins: number;
  
    @IsInt()
    lipids: number;

    @IsInt()
    carbohydrates: number;

    userId: string;
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    date: Date;

    ingredients: string;
}