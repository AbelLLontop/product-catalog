import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create_Brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
