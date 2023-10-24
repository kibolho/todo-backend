import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { UserEntity } from "src/users/users.entity";
import { AllConfigType } from "src/config/config.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("auth.secret", {
        infer: true,
      }),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user: UserEntity = await this.usersService.getUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
