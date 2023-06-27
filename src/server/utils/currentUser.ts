import { type Session } from "next-auth";
import { createParamDecorator } from "type-graphql";

export interface MyContextType {
  session: Session;
}
export function CurrentUser() {
  return createParamDecorator<MyContextType>(({ context }) => context.session.user);
}
