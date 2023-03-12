import {IsNotEmpty, IsString} from 'class-validator';

export class SportsExerciseDto {
    userId: string;
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}