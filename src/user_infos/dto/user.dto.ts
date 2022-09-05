import {Gender, SportFrequence} from '@prisma/client';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class UserInfosDto {
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
    @IsString()
    description: string;
}