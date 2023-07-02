import { type MyContextType } from "@/server/utils/currentUser";
import { type AuthCheckerInterface, type ResolverData } from "type-graphql";

// https://typegraphql.com/docs/authorization.html
export class CustomAuthChecker implements AuthCheckerInterface<MyContextType> {
  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { root, args, context, info }: ResolverData<MyContextType>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roles: string[]
  ) {
    return typeof context.user !== "undefined";
  }
}
