import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create_brand.dto';
import { UpdateBrandDto } from './dto/update_brand.dto';
import { CreateModelDto } from './dto/create_model.dto';
import { UpdateModelDto } from './dto/update_model.dto';
import { CreateColorDto } from './dto/create_color.dto';
import { UpdateColorDto } from './dto/update_color.dto';
import { CreateSizeDto } from './dto/create_size.dto';
import { UpdateSizeDto } from './dto/update_size.dto';
import { CatalogsService } from './catalogs.service';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogService: CatalogsService) {}

  // Brands
  @Post('brands')
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.catalogService.createBrand(createBrandDto);
  }

  @Patch('brands/:id')
  async updateBrand(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.catalogService.updateBrand(id, updateBrandDto);
  }

  @Delete('brands/:id')
  async removeBrand(@Param('id') id: number) {
    return this.catalogService.removeBrand(id);
  }

  @Get('brands')
  async findAllBrands() {
    return this.catalogService.findAllBrands();
  }

  // Models
  @Post('models')
  async createModel(@Body() createModelDto: CreateModelDto) {
    return this.catalogService.createModel(createModelDto);
  }

  @Patch('models/:id')
  async updateModel(
    @Param('id') id: number,
    @Body() updateModelDto: UpdateModelDto,
  ) {
    return this.catalogService.updateModel(id, updateModelDto);
  }

  @Delete('models/:id')
  async removeModel(@Param('id') id: number) {
    return this.catalogService.removeModel(id);
  }

  @Get('models')
  async findAllModels() {
    return this.catalogService.findAllModels();
  }

  // Colors
  @Post('colors')
  async createColor(@Body() createColorDto: CreateColorDto) {
    return this.catalogService.createColor(createColorDto);
  }

  @Patch('colors/:id')
  async updateColor(
    @Param('id') id: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.catalogService.updateColor(id, updateColorDto);
  }

  @Delete('colors/:id')
  async removeColor(@Param('id') id: number) {
    return this.catalogService.removeColor(id);
  }

  @Get('colors')
  async findAllColors() {
    return this.catalogService.findAllColors();
  }

  // Sizes
  @Post('sizes')
  async createSize(@Body() createSizeDto: CreateSizeDto) {
    return this.catalogService.createSice(createSizeDto);
  }

  @Patch('sizes/:id')
  async updateSize(
    @Param('id') id: number,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.catalogService.updateSize(id, updateSizeDto);
  }

  @Delete('sizes/:id')
  async removeSize(@Param('id') id: number) {
    return this.catalogService.removeSize(id);
  }

  @Get('sizes')
  async findAllSizes() {
    return this.catalogService.findAllSizes();
  }
}
