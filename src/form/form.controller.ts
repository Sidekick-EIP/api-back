import { FormDto } from './dto/form.dto';
import { FormService } from './form.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('form')
export class FormController {
  constructor(private formservice: FormService) { }

  @Post('save')
  async saveFormDatas(@Body() dto: FormDto, userId: string) {
    return await this.formservice.saveFormDatas(dto, userId);
  }
}
