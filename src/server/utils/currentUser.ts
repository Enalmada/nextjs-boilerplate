import { type User } from "@prisma/client";
import { createParamDecorator } from "type-graphql";

export interface MyContextType {
  user: User;
}
export function CurrentUser() {
  return createParamDecorator<MyContextType>(({ context }) => context.user);
}
