import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './products.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  // 创建商品
  async create(product: Partial<ProductsEntity>): Promise<ProductsEntity> {
    const { title } = product;
    if (!title) {
      throw new HttpException('缺少产品标题', 401);
    }
    const doc = await this.productsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('产品已存在', 401);
    }
    return await this.productsRepository.save(product);
  }

  // 获取指定产品
  async findById(id): Promise<ProductsEntity> {
    return await this.productsRepository.findOneBy({ id: id });
  }

  // 更新文章
  async updateById(id, product): Promise<ProductsEntity> {
    const existProduct = await this.productsRepository.findOne(id);
    if (!existProduct) {
      throw new HttpException(`id为${id}的产品不存在`, 401);
    }
    const updateProduct = this.productsRepository.merge(existProduct, product);
    return this.productsRepository.save(updateProduct);
  }

  // 刪除文章
  async remove(id) {
    const existProduct = await this.productsRepository.findOne(id);
    if (!existProduct) {
      throw new HttpException(`id为${id}的产品不存在`, 401);
    }
    return await this.productsRepository.remove(existProduct);
  }

  // 获取文章列表
  async findAll(): Promise<ProductsEntity[]> {
    return this.productsRepository.find();
  }
}
