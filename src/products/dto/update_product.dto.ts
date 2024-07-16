import { PartialType } from '@nestjs/swagger';
import { CreateproductDto } from './create_product.dto';

export class UpdateProductDto extends PartialType(CreateproductDto) {}
