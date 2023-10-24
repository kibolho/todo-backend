import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { TodoEntity } from "./todos.entity";
import { TodosResolver } from "./todos.resolver";
import { TodosService } from "./todos.service";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), AuthModule],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
