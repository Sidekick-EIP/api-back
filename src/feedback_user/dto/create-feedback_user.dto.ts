import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFeedbackUserDto {
  userId: string;
  id: number;

  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
