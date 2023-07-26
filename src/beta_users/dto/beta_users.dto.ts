import { Page } from '@prisma/client';
import {IsNotEmpty, IsString} from 'class-validator';

export class BetaUsersDto {
    id: number;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;
}