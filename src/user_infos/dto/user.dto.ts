import { Gender, Goal, Level, Activities } from "@prisma/client";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

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
  birth_date: Date;

  @IsNotEmpty()
  @IsInt()
  size: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsNotEmpty()
  @IsInt()
  goal_weight: number;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  goal: Goal;

  @IsNotEmpty()
  level: Level;

  @IsNotEmpty()
  activities: Activities[];
}
