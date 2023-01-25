import {IsArray, IsDate, IsInt, IsJSON, IsNotEmpty, IsString} from 'class-validator';

export class MealsDto {
    userId: string;
    id: number;

    @IsNotEmpty()
    @IsString()
    period: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    date: Date;

    ingredients: string;
}