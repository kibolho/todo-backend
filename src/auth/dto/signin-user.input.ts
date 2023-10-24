import { Field, InputType } from "@nestjs/graphql";
import { IsString, Length, Matches } from "class-validator";

@InputType()
export class SigninUserInput {
  @Field()
  @IsString()
  @Length(4, 20)
  username: string;

  @Field()
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Password is too weak, use: 
    At least one digit (0-9)
    At least one special character (punctuation, symbol, etc.)
    No newline characters
    At least one uppercase letter (A-Z)
    At least one lowercase letter (a-z)`,
  })
  password: string;
}
