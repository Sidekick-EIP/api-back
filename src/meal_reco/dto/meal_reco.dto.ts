import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MealRecoDto {
  @IsNotEmpty()
  @IsString()
  user_needs: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  goal: string;
}