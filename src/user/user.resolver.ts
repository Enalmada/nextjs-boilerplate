import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import UserService from "@/user/user.service";

import { User } from "./user.model"

@Service()
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
