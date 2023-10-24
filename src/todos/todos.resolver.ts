import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/get-current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserEntity } from "src/users/users.entity";
import { CreateTodoInput } from "./dto/create-todo.dto";
import { UpdateTodoInput } from "./dto/update-todo.dto";
import { TodoEntity } from "./todos.entity";
import { TodosService } from "./todos.service";

@Resolver(() => TodoEntity)
@UseGuards(JwtAuthGuard)
export class TodosResolver {
  constructor(private todoService: TodosService) {}

  @Query(() => [TodoEntity])
  async getAllTodos(@CurrentUser() user: UserEntity): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos(user);
  }

  @Query(() => TodoEntity)
  async getTodo(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<TodoEntity> {
    return this.todoService.getTodo(id, user);
  }

  @Mutation(() => TodoEntity)
  async createTodo(
    @Args("createTodoInput") createTodoInput: CreateTodoInput,
    @CurrentUser() user: any
  ): Promise<TodoEntity> {
    return this.todoService.createTodo(createTodoInput, user);
  }

  @Mutation(() => TodoEntity)
  async updateTodo(
    @CurrentUser() user: UserEntity,
    @Args("updateTodoInput") updateTodoInput: UpdateTodoInput
  ): Promise<TodoEntity> {
    return this.todoService.updateTodoStatus(updateTodoInput, user);
  }

  @Mutation(() => TodoEntity)
  // @UseGuards(JwtAuthGuard)
  async deleteTodo(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() user: UserEntity
  ): Promise<TodoEntity> {
    return this.todoService.deleteTodo(id, user);
  }
}
