import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserParams } from '@/common/interfaces/login';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.findOneBy('email', email);

    if (!user) throw new BadRequestException('user not found');
    if (!user.isActive) throw new UnauthorizedException('user not exist');
    if (user.password && !this.verificationLogin(password, user.password))
      throw new UnauthorizedException('password incorrect');

    return {
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      role: user.roles,
      active: user.isActive,
    };
  }

  async login(authenticatedUser: AuthenticatedUserParams) {
    const token = await this.jwtService.signAsync({
      uuid: authenticatedUser.uuid,
    });
    return {
      message: 'user logged in successfully',
      user: {
        username: authenticatedUser.username,
        token: token,
      },
    };
  }

  verificationLogin(password: string, hash: string) {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
  }
}
