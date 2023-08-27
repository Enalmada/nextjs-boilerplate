import Logger from '@/lib/logging/log-util';
import { type User } from '@/server/db/schema';

import UserRepository from './user.repository';

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
    const user = await UserRepository.findFirst({ firebaseId });

    if (!user) {
      logger.info('user created');

      return UserRepository.create({
        firebaseId: firebaseId,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else if (user.email != email) {
      logger.info('user updated');

      return UserRepository.update(user.id, {
        email: email,
        updatedAt: new Date(),
        version: user.version + 1,
      });
    }

    return user;
  }
}
