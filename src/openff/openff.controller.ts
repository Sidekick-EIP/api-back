import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../common/decorators';
import { OpenffService } from './openff.service';

@Controller('openff')
export class OpenffController {
  constructor(private readonly openffService: OpenffService) {}

  @Public()
  @Get(":request")
  findAll(@Param("request") request: string) {
    return this.openffService.findAll(request);
  }
}
