import UserService from "@/server/user/user.service";
import { injectable } from "tsyringe";
import { Resolver } from "type-graphql";

import { User } from "./user.model";

@injectable()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
