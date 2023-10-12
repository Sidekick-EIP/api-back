import { Period } from '@prisma/client';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateNutritionDto {
    userId: string;
    id: number;

    @IsOptional()
    @IsString()
    period: Period;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    picture: string;

    @IsOptional()
    @IsString()
    date: string;

    @IsOptional()
    @IsInt()
    protein: number;

    @IsOptional()
    @IsInt()
    carbs: number;

    @IsOptional()
    @IsInt()
    fat: number;

    @IsOptional()
    @IsInt()
    weight: number;

    @IsOptional()
    @IsInt()
    calories: number;
}