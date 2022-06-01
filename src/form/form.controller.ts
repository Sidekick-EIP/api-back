import { FormDto } from './dto/form.dto';
import { FormService } from './form.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';


@Controller('form')
export class FormController {
  constructor(private formservice: FormService) { }

  @Public()
  @Post('save')
  saveFormDatas(@Body() dto: FormDto) {
    return this.formservice.saveFormDatas(dto);
  }
  
}
