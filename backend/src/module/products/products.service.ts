import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { handleDBExceptions } from '@/common/utils/handle-db-xception';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { skip } from 'node:test';
import { PaginationDto } from '@/common/interfaces/pagination';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product)
    private usersRepository: Repository<Product>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, uuidUser: string) {
    try {
      const product = this.usersRepository.create({
        ...createProductDto,
        user: { uuid: uuidUser },
      });
      await this.usersRepository.save(product);

      return product;
    } catch (error) {}
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    try {
      const findProducts = await this.usersRepository.find({
        skip,
        take,
      });

      if (findProducts.length == 0) {
        return { message: 'No products found' };
      }

      return findProducts;
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
