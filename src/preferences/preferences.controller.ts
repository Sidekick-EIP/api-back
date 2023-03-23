import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetCurrentUserEmail } from '../common/decorators';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Patch()
  update(@Body() dto: UpdatePreferenceDto, @GetCurrentUserEmail() email: string) {
    return this.preferencesService.update(dto, email);
  }

  @Get()
  get(@GetCurrentUserEmail() email: string) {
    return this.preferencesService.get(email);
  }
}
