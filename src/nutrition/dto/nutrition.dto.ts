import { Period } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NutritionDto {
    userId: string;
    id: number;

    @IsNotEmpty()
    @IsString()
    period: Period;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    picture: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsInt()
    protein: number;

    @IsNotEmpty()
    @IsInt()
    carbs: number;

    @IsNotEmpty()
    @IsInt()
    fat: number;

    @IsNotEmpty()
    @IsInt()
    weight: number;

    @IsNotEmpty()
    @IsInt()
    calories: number;
}