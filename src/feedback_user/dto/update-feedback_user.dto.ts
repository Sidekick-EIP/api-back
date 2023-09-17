import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFeedbackUserDto {
  id: number;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment: string;
}
