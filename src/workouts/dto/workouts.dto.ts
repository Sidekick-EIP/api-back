import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class WorkoutsDto {
    userId: string;
    id: number;

    @IsNotEmpty()
    @IsInt()
    exerciseId: number;

    @IsNotEmpty()
    @IsInt()
    duration: number;

    @IsNotEmpty()
    @IsString()
    date: string;
}