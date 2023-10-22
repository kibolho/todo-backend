import { ParseIntPipe, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Todo } from "../graphql.schema";
import { TodosGuard } from "./todos.guard";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

const pubSub = new PubSub();

@Resolver("Todo")
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query("todos")
  @UseGuards(TodosGuard)
  async getTodos() {
    return this.todosService.findAll();
  }

  @Query("todo")
  async findOneById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Todo> {
    return this.todosService.findOneById(id);
  }

  @Mutation("createTodo")
  async create(@Args("createTodoInput") args: CreateTodoDto): Promise<Todo> {
    const createdTodo = await this.todosService.create(args);
    pubSub.publish("todoCreated", { todoCreated: createdTodo });
    return createdTodo;
  }

  @Mutation("updateTodo")
  async updateTodo(
    @Args("updateTodoInput") 
    args: UpdateTodoDto
  ): Promise<Todo> {
    const updatedTodo = await this.todosService.update(args);
    pubSub.publish("todoUpdated", { todoUpdated: updatedTodo });
    return updatedTodo;
  }

  @Mutation("deleteTodo")
  async deleteTodo(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Todo> {
    const result = await this.todosService.delete(id);
    pubSub.publish("todoDeleted", { todoDeleted: result });
    return result;
  }

  @Subscription("todoCreated")
  todoCreated() {
    return pubSub.asyncIterator("todoCreated");
  }

  @Subscription("todoUpdated")
  todoUpdated() {
    return pubSub.asyncIterator("todoUpdated");
  }

  @Subscription("todoDeleted")
  todoDeleted() {
    return pubSub.asyncIterator("todoDeleted");
  }
}
