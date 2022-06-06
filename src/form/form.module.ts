import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  imports: [PrismaModule],
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule {}
