/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-empty */
import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { handleDBExceptions } from '@/common/utils/handle-db-xception';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor() {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    try {
      return `This action returns all products`;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  findOne(id: number) {
    try {
      return `This action returns a #${id} product`;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return `This action updates a #${id} product`;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} product`;
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }
}
