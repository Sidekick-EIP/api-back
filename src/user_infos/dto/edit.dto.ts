import { Gender, Goal, Level, Activities } from "@prisma/client";
import { IsInt, IsOptional, IsString } from "class-validator";

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
  @IsInt()
  size?: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsInt()
  weight?: number;

  @IsOptional()
  @IsInt()
  goal_weight?: number;

  @IsOptional()
  gender?: Gender;

  @IsOptional()
  level?: Level;

  @IsOptional()
  activities?: Activities[];

  @IsOptional()
  goal?: Goal;
}
