import {Gender, SportFrequence} from '@prisma/client';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class UserInfosDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    Username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}