import {Query, Resolver} from "type-graphql";
import { User } from "./user.model"
@Resolver(User)
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'Hello World!';
    }

    @Query(() => [User])
    users() {
        return [{ id: 1, name: "Adam", email: "enalmada@gmail.com"}];
    }

}
