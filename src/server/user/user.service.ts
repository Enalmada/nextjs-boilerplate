import { injectable } from "tsyringe";

import { type User } from "./user.model";

@injectable()
export default class UserService {
  getUsers(): [User] {
    return [{ id: "1", name: "Adam!", email: "enalmada@gmail.com" }];
  }
}
