import { PartialType } from '@nestjs/swagger';
import { CreateModelDto } from './create_model.dto';

export class UpdateModelDto extends PartialType(CreateModelDto) {}
