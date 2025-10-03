/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { handleDBExceptions } from '@/common/utils/handle-db-xception';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '@/common/interfaces/pagination';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, uuidUser: string) {
    try {
      const product = this.productsRepository.create({
        ...createProductDto,
        user: { uuid: uuidUser },
      });
      await this.productsRepository.save(product);

      return product;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    try {
      const findProducts = await this.productsRepository.find({
        skip,
        take,
      });

      if (findProducts.length == 0) {
        throw new NotFoundException('No products found');
      }

      return findProducts;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findOne(uuid: string) {
    try {
      const queryBuilder =
        this.productsRepository.createQueryBuilder('Product');

      const product = await queryBuilder
        .where('Product.uuid = :uuid', { uuid })
        .leftJoinAndSelect('Product.user', 'user')
        .getOne();
      if (!product) throw new NotFoundException('product not found', uuid);
      return product;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    const queryRuner = this.dataSource.createQueryRunner();
    await queryRuner.connect();

    try {
      await queryRuner.startTransaction();
      const productUpdate = await this.productsRepository.preload({
        uuid,
        ...updateProductDto,
      });
      if (!productUpdate) throw new NotFoundException('Product not found');
      await queryRuner.manager.save(productUpdate);

      const productWithRelations = await queryRuner.manager.findOne(Product, {
        where: { uuid },
        relations: ['user'],
      });

      await queryRuner.commitTransaction();

      return {
        message: 'Update sucefully',
        productWithRelations,
      };
    } catch (error) {
      await queryRuner.rollbackTransaction();
      handleDBExceptions(error, this.logger);
    } finally {
      await queryRuner.release();
    }
  }

  async removeAll() {
    const query = this.productsRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async remove(uuid: string) {
    try {
      const deleteProduct = await this.productsRepository.delete({ uuid });
      if (deleteProduct.affected === 0) {
        throw new NotFoundException(`Product with UUID "${uuid}" not found.`);
      }

      return deleteProduct;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
