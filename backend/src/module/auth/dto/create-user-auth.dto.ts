import { userRoles } from '@/common/utils/enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @MinLength(4, { message: 'username required minimum 4 characters' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(4, { message: 'password required minimum 4 characters' })
  @IsString()
  password: string;
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsOptional()
  @IsEnum(userRoles, {
    message: 'rol must be a valid user role [user, admin]',
  })
  rol: userRoles;
}
