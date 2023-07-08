import { type User } from "@prisma/client";
import { createParamDecorator } from "type-graphql";

export interface MyContextType {
  currentUser: User;
}
export function CurrentUser() {
  return createParamDecorator<MyContextType>(({ context }) => {
    return context.currentUser;
  });
}
