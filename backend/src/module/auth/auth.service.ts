import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createAuthDto: CreateUserDto) {
    try {
      await this.userRepository.save(createAuthDto);
      return createAuthDto;
    } catch (error) {
      console.log(error);
    }
  }
  singIn(createAuthDto: LoginUserDto) {
    return createAuthDto;
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
