import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create_brand.dto';
import { UpdateBrandDto } from './dto/update_brand.dto';
import { CreateModelDto } from './dto/create_model.dto';
import { UpdateModelDto } from './dto/update_model.dto';
import { CreateColorDto } from './dto/create_color.dto';
import { UpdateColorDto } from './dto/update_color.dto';
import { CreateSizeDto } from './dto/create_size.dto';
import { UpdateSizeDto } from './dto/update_size.dto';

@Injectable()
export class CatalogsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBrand(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.create({
      data: createBrandDto,
    });
  }
  async updateBrand(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id: Number(id) },
      data: updateBrandDto,
    });
  }
  async removeBrand(id: number) {
    try {
      return await this.prisma.brand.delete({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw new ForbiddenException(
        'No se puede eliminar la marca porque tiene modelos asociados',
      );
    }
  }
  async findAllBrands() {
    return this.prisma.brand.findMany();
  }

  async createModel(createModelDto: CreateModelDto) {
    return this.prisma.model.create({
      data: createModelDto,
    });
  }
  async updateModel(id: number, updateModelDto: UpdateModelDto) {
    return this.prisma.model.update({
      where: { id: Number(id) },
      data: updateModelDto,
    });
  }
  async removeModel(id: number) {
    try {
      return await this.prisma.model.delete({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw new ForbiddenException(
        'No se puede eliminar el modelo porque tiene colores asociados',
      );
    }
  }
  async findAllModels() {
    return this.prisma.model.findMany();
  }
  async createColor(createColorDto: CreateColorDto) {
    return this.prisma.color.create({
      data: createColorDto,
    });
  }
  async updateColor(id: number, updateColorDto: UpdateColorDto) {
    return this.prisma.color.update({
      where: { id: Number(id) },
      data: updateColorDto,
    });
  }
  async removeColor(id: number) {
    try {
      return await this.prisma.color.delete({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw new ForbiddenException(
        'No se puede eliminar el color porque tiene tallas asociadas',
      );
    }
  }
  async findAllColors() {
    return this.prisma.color.findMany();
  }
  async createSice(createSizeDto: CreateSizeDto) {
    return this.prisma.size.create({
      data: createSizeDto,
    });
  }
  async updateSize(id: number, updateSizeDto: UpdateSizeDto) {
    return this.prisma.size.update({
      where: { id: Number(id) },
      data: updateSizeDto,
    });
  }
  async removeSize(id: number) {
    try {
      return await this.prisma.size.delete({
        where: { id: Number(id) },
      });
    } catch (e) {
      throw ReferenceError(
        'No se puede eliminar la talla porque tiene tallas asociadas',
      );
    }
  }
  async findAllSizes() {
    return this.prisma.size.findMany();
  }
}
