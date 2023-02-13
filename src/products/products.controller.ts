import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@ApiTags('产品')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * 创建产品
   * @param product
   */
  @ApiOperation({ summary: '创建产品' })
  @Post()
  async create(@Body() product: CreateProductDto) {
    return await this.productsService.create(product);
  }

  /**
   * 获取所有产品
   */
  @Get()
  async findAll(): Promise<any> {
    return await this.productsService.findAll();
  }

  /**
   * 获取指定产品
   * @param id
   */
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.productsService.findById(id);
  }

  /**
   * 更新产品
   * @param id
   * @param product
   */
  @Put(':id')
  async update(@Param('id') id, @Body() product) {
    return await this.productsService.updateById(id, product);
  }

  /**
   * 删除
   * @param id
   */
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.productsService.remove(id);
  }
}
