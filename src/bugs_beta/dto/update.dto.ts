import { Page } from '@prisma/client';
import {IsOptional, IsString} from 'class-validator';

export class UpdateBugsBetaDto {
    id: number;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    page: Page;
}