import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
