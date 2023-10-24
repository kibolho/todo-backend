import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TodoEntity } from "./todos.entity";
import { CreateTodoInput } from "./dto/create-todo.dto";
import { UpdateTodoInput } from "./dto/update-todo.dto";
import { UserEntity } from "src/users/users.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>
  ) {}

  async getAllTodos(user: UserEntity): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find({
      where: { owner: { id: user.id } },
    });
    if (!todos) {
      throw new InternalServerErrorException();
    }
    return todos;
  }

  async getTodo(id: string, user: UserEntity): Promise<TodoEntity> {
    const todoFound = await this.todoRepository.findOne({
      where: { id, owner: { id: user.id }},
    });
    if (!todoFound) {
      throw new NotFoundException(`TodoEntity with id ${id} not found.`);
    }
    return todoFound;
  }

  async createTodo(
    createTodoInput: CreateTodoInput,
    user: any
  ): Promise<TodoEntity> {
    const { title } = createTodoInput;

    const newTodo = this.todoRepository.create({
      title,
      done: false,
      owner: user,
    });

    try {
      await this.todoRepository.save(newTodo);
      return newTodo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateTodoStatus(
    updateTodoInput: UpdateTodoInput,
    user: UserEntity
  ): Promise<TodoEntity> {
    const todo = await this.getTodo(updateTodoInput.id, user);
    const { title, done } = updateTodoInput;
    if (title) {
      todo.title = title;
    }
    if (done !== undefined) {
      todo.done = done;
    }

    try {
      await this.todoRepository.save(todo);
      return todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTodo(id: string, user: UserEntity): Promise<TodoEntity> {
    const todoFound: TodoEntity = await this.getTodo(id, user);
    const removedTodoId = todoFound.id;
    const result: TodoEntity = await this.todoRepository.remove(todoFound);
    if (!result) {
      throw new NotFoundException(`TodoEntity with id ${id} not found.`);
    }
    result.id = removedTodoId;
    return result;
  }
}
