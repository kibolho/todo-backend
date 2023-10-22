import { Length } from 'class-validator';
import { CreateTodoInput } from '../../graphql.schema';

export class CreateTodoDto extends CreateTodoInput {
  @Length(2)
  title: string;
}
