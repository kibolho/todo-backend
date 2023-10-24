import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async run() {
    await this.repository.save(
      this.repository.create({
        username: "admin@example.com",
        password: "secret",
      })
    );
  }
}
