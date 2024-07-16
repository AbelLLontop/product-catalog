import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create_brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
