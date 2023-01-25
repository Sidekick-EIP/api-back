import { Gender, SportFrequence } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class EditInfosDto {
  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  size?: number;

  @IsOptional()
  @IsString()
  weight?: number;

  @IsOptional()
  gender?: Gender;

  @IsOptional()
  sport_frequence?: SportFrequence;
}
