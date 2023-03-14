import { Gender, SportFrequence } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class UserInfosDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  birth_date: Date;

  @IsNotEmpty()
  @IsString()
  size: number;

  @IsNotEmpty()
  @IsString()
  weight: number;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  sport_frequence: SportFrequence;
}
