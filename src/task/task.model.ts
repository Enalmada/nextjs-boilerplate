import { TaskStatus } from "@prisma/client";
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";

registerEnumType(TaskStatus, {
  name: "TaskStatus",
});

@InputType()
export class TaskInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status!: TaskStatus;

  @Field({ nullable: true })
  dueDate?: Date;
}

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status!: TaskStatus;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  // @Field()
  // user!: User;
}
