/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(createAuthDto: CreateUserDto) {
    try {
      createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
      await this.userRepository.save(createAuthDto);
      return createAuthDto;
    } catch (error) {
      console.log(error);
    }
  }
  async singIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        uuid: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) throw new BadRequestException('user not found');

    if (!this.verificationLogin(password, user.password))
      throw new UnauthorizedException('password incorrect');

    const payload = { uuid: user.uuid };
    return {
      token: this.jwtService.sign(payload),
      user: {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
      },
    };
  }

  verificationLogin(password: string, hash: string) {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
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
