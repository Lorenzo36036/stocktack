import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/decorators/interface/role.enum';
import { GetUser } from '@/common/decorators/getUser';
import { PaginationDto } from '@/common/interfaces/pagination';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @Auth(Role.user)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser('uuid') userUuid: string,
  ) {
    return this.productsService.create(createProductDto, userUuid);
  }

  @Get('all')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.productsService.findOne(uuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('delete/all')
  removeAll() {
    return this.productsService.removeAll();
  }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
