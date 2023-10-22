import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Todo, Owner } from '../graphql.schema';
import { OwnersService } from '../owners/owners.service';

@Resolver('Todo')
export class TodoOwnerResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @ResolveField()
  async owner(@Parent() todo: Todo & { ownerId: number }): Promise<Owner> {
    return this.ownersService.findOneById(todo.ownerId);
  }
}
