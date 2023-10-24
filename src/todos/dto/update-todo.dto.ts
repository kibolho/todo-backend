import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, Length } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  @IsUUID('4', { each: true })
  id: string;

  @Length(2)
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field()
  done: boolean;
}
