/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleDBExceptions = (error: any, logger: Logger) => {
  logger.error(
    `Error code: ${error.code} - Message: ${error.message} - Detail: ${error.detail}`,
  );
  if (error.code === '22P02')
    throw new BadRequestException(`Invalid ID not exits`);

  if (error.code === '23502')
    throw new BadRequestException(`Null values are not allowed`);

  if (error.code === '23503')
    throw new BadRequestException('Table foreing no exits');

  if (error.code === '23505')
    throw new BadRequestException(`Product with this slug already exists`);

  if (error.code === '23514')
    throw new BadRequestException(`Violation of check please verify the data`);

  if (error.code === '42703') throw new BadRequestException('Column not exist');

  throw new InternalServerErrorException(
    `Can't create product - Check server logs`,
  );
};
