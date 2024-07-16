import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
// import { Permission } from 'src/auth/decorators/permissions.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { CreateproductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { ProductsService } from './products.service';
import { Response } from 'express';

@Controller('products')
// @UseGuards(JwtGuard, RoleGuard)
export class ProductsController {
  // @Get()
  // @Permission('read:products')
  // prueba() {
  //   return 'Hola mundo';
  // }
  constructor(private readonly productsService: ProductsService) {}

  @Get('filter')
  async filterProducts(@Query() query: any) {
    return this.productsService.filterProducts(query);
  }

  @Get('search')
  async searchProducts(@Query('q') query: string) {
    return this.productsService.search(query);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateproductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Get('export/excel')
  async exportToExcel(@Res() res: Response) {
    const products = await this.productsService.findAll();
    const buffer = await this.productsService.exportToExcel(products);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
    res.send(buffer);
  }
}
