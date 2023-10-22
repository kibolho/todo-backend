import { IsOptional, Length } from 'class-validator';
import { UpdateTodoInput } from '../../graphql.schema';

export class UpdateTodoDto extends UpdateTodoInput {
  @Length(2)
  @IsOptional()
  title?: string;
}
