import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TodoEntity } from 'src/todos/todos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => TodoEntity, (todo) => todo.owner)
  @Field(() => [TodoEntity])
  todos: TodoEntity[];
}