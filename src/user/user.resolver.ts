import UserService from "@/user/user.service";
import { injectable } from "tsyringe";
import { Query, Resolver } from "type-graphql";

import { User } from "./user.model";

@injectable()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return "Hello World!";
  }

  @Query(() => [User])
  users() {
    return this.userService.getUsers();
  }
}
