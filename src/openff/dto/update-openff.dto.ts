import { PartialType } from '@nestjs/mapped-types';
import { CreateOpenffDto } from './create-openff.dto';

export class UpdateOpenffDto extends PartialType(CreateOpenffDto) {}
