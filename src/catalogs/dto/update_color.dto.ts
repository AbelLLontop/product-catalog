import { PartialType } from '@nestjs/swagger';
import { CreateColorDto } from './create_color.dto';

export class UpdateColorDto extends PartialType(CreateColorDto) {}
