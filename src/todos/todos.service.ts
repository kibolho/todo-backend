import { Injectable } from "@nestjs/common";
import { Todo } from "../graphql.schema";

@Injectable()
export class TodosService {
  private todos: Array<Todo & { ownerId?: number }> = [
    { id: 1, title: "Launch", done: false },
  ];

  create(todo: Todo): Todo {
    todo.id = this.todos.length + 1;
    this.todos.push(todo);
    return todo;
  }

  update(todo: Todo): Todo {
    let newTodo;
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        newTodo = { ...item, ...todo };
        return newTodo;
      }
      return item;
    });
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOneById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  delete(id: number): Todo {
    let deletedTodo;
    this.todos = this.todos.filter((item) => {
      if(item.id !== id)
        return true
      deletedTodo = item;
      return false
    });
    return deletedTodo;
  }
}
