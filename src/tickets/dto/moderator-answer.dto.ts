import { IsNumber, IsString } from "class-validator";

export class ModeratorAnswerDto {
  @IsString()
  answer: string;
}

