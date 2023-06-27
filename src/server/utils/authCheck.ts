import { type User } from "next-auth";

export default function authCheck(user: User, id: string) {
  if (user.id !== id) {
    console.log("user.id:" + user.id + " " + "id:" + id);
    throw Error("unauthorized");
  }
}
