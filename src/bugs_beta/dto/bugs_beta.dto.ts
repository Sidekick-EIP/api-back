import { Page } from '@prisma/client';
import {IsNotEmpty, IsString} from 'class-validator';

export class BugsBetaDto {
    userId: string;
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    page: Page;
}