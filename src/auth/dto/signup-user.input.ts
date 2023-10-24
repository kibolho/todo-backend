import { InputType } from "@nestjs/graphql";
import { SigninUserInput } from "./signin-user.input";

@InputType()
export class SignupUserInput extends SigninUserInput {}
