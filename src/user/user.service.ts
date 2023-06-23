import { Service } from "typedi";

import { type User } from "./user.model";

@Service()
export default class UserService {
  getUsers(): [User] {
    return [{ id: "1", name: "Adam!", email: "enalmada@gmail.com" }];
  }
}
