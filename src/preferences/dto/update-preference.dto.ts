import { IsBoolean, IsOptional } from "class-validator";

export class UpdatePreferenceDto {
  @IsOptional()
  @IsBoolean()
  darkMode: boolean;

  @IsOptional()
  @IsBoolean()
  sounds: boolean;

  @IsOptional()
  @IsBoolean()
  notifications: boolean;
}
