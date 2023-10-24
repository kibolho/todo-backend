import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { SigninResponse } from './dto/signin-response';
import { SigninUserInput } from './dto/signin-user.input';
import { SignupResponse } from './dto/signup-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signinUserInput: SigninUserInput): Promise<SignupResponse> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signinUserInput.password, salt);
    signinUserInput.password = hashedPassword;

    return this.usersService.createUser(signinUserInput);
  }

  async signin(user: UserEntity): Promise<SigninResponse> {
    const username = user.username;
    const access_token = await this.jwtService.sign({
      username,
      sub: user.id,
    });
    if (!access_token) {
      throw new InternalServerErrorException();
    }
    return {
      access_token,
      username,
    };
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.getUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
