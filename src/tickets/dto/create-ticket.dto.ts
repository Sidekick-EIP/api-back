import { IsString } from "class-validator";

export class CreateTicketDto {
  @IsString()
  content: string;

  @IsString()
  title: string;
}