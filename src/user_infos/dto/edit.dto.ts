import { Gender, SportFrequence } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class EditInfosDto {
  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;

  @IsString()
  description?: string;

  @IsString()
  size?: number;

  @IsString()
  weight?: number;

  gender?: Gender;

  sport_frequence?: SportFrequence;
}
