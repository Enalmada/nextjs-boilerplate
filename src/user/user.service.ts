import { type User } from "./user.model"
import { Service } from 'typedi';

@Service()
export default class UserService {
    getUsers(): [User] {
        return [{ id: "1", name: "Adam!", email: "enalmada@gmail.com"}];
    }
}
