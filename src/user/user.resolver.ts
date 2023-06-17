import { Query, Resolver } from "type-graphql";
import { User } from "./user.model"
import UserService from "@/user/user.service";
import { Service } from "typedi";

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
