import Logger from '@/lib/logging/log-util';
import { type User } from '@/server/user/user.repository';

import userRepo from './user.repository';

export default class UserService {
  static async createOrGetFirebaseUser(
    firebaseId: string,
    email: string | undefined
  ): Promise<User> {
    // TODO pass ctx here to log any suspicious ip, etc
    const logger = new Logger(UserService.name, undefined, { firebaseId, email });

    // TODO - send welcome email on new user creation
    // EmailService.sendWelcome()

    // To avoid an unnecessary update, we need to find first and compare incoming attributes that might be different
    const user = await userRepo.findFirst({ firebaseId });

    if (!user) {
      logger.info('user created');
      return userRepo.create({
        firebaseId: firebaseId,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else if (user.email != email) {
      logger.info('user updated');
      return userRepo.update(user.id, { email: email, updatedAt: new Date() });
    }

    return user;
  }
}
