import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WorkoutsDto {
    userId: string;
    id: number;

    @IsNotEmpty()
    @IsString()
    date: string;
}