import {IsArray, IsDate, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateMealsDto {
    userId: string;
    id: number;

    @IsOptional()
    @IsString()
    period: string;

    @IsOptional()
    @IsString()
    name: string;

	@IsOptional()
    @IsString()
    date: Date;

	@IsOptional()
    ingredients: string;
}