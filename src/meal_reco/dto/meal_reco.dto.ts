import { IsNotEmpty, IsString } from 'class-validator';

export class MealRecoDto {
  @IsNotEmpty()
  @IsString()
  user_needs: string;

  @IsNotEmpty()
  @IsString()
  goal: string;
}