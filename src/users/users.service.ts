import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { SignupResponse } from "src/auth/dto/signup-response";
import { SigninUserInput } from "src/auth/dto/signin-user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserInput: SigninUserInput): Promise<SignupResponse> {
    try {
      const user = this.usersRepository.create(createUserInput);
      await this.usersRepository.save(user);
      const { username } = user;
      return { username };
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists.");
      } else {
        console.error(error)
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User ${username} not found.`);
    }
    return user;
  }
}
