import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateproductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @IsNotEmpty()
  @IsNumber()
  modelId: number;

  @IsNotEmpty()
  @IsNumber()
  colorId: number;

  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  salePrice: number;
}
