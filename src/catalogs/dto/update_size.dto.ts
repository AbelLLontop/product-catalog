import { PartialType } from '@nestjs/swagger';
import { CreateSizeDto } from './create_size.dto';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {}
