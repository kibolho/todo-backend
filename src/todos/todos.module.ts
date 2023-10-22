import { Module } from "@nestjs/common";
import { OwnersModule } from "../owners/owners.module";
import { TodoOwnerResolver } from "./todos-owner.resolver";
import { TodosResolver } from "./todos.resolver";
import { TodosService } from "./todos.service";

@Module({
  imports: [OwnersModule],
  providers: [TodosService, TodosResolver, TodoOwnerResolver],
})
export class TodoModule {}
