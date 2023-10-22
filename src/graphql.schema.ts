
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateTodoInput {
    title: string;
    done?: Nullable<boolean>;
}

export class UpdateTodoInput {
    id: number;
    title?: Nullable<string>;
    done?: Nullable<boolean>;
}

export abstract class IQuery {
    abstract todos(): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;

    abstract todo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;
}

export abstract class IMutation {
    abstract createTodo(createTodoInput?: Nullable<CreateTodoInput>): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract updateTodo(updateTodoInput?: Nullable<UpdateTodoInput>): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract deleteTodo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;
}

export abstract class ISubscription {
    abstract todoCreated(): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract todoUpdated(): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract todoDeleted(): Nullable<Todo> | Promise<Nullable<Todo>>;
}

export class Owner {
    id: number;
    name: string;
    todos?: Nullable<Todo[]>;
}

export class Todo {
    id?: Nullable<number>;
    title?: Nullable<string>;
    done?: Nullable<boolean>;
    owner?: Nullable<Owner>;
}

type Nullable<T> = T | null;
