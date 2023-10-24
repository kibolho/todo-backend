import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/users.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('todos')
@ObjectType('todos')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field()
  title: string;

  @Column('boolean')
  @Field()
  done: boolean

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @Field(() => UserEntity)
  owner: UserEntity;
}
