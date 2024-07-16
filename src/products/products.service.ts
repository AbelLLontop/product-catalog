import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateproductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { Product } from '@prisma/client';
import * as exceljs from 'exceljs';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async search(query: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
      },
    });
  }
  async filterProducts(filters: {
    brandId?: number;
    modelId?: number;
    colorId?: number;
    sizeId?: number;
  }): Promise<Product[]> {
    const { brandId, modelId, colorId, sizeId } = filters;

    return this.prisma.product.findMany({
      where: {
        ...(brandId && { brandId }),
        ...(modelId && { modelId }),
        ...(colorId && { colorId }),
        ...(sizeId && { sizeId }),
      },
    });
  }

  async create(createProductDto: CreateproductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }
  async findAll() {
    return this.prisma.product.findMany({
      include: {
        brand: true,
        model: true,
        color: true,
        size: true,
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        model: true,
        color: true,
        size: true,
      },
    });
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }
  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async exportToExcel(products: Product[]): Promise<exceljs.Buffer> {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
    ];

    products.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
