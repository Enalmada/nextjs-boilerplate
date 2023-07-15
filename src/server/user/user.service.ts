import Logger from '@/lib/logging/log-util';
import prismaClient from '@/server/db/db';
import { type User } from '@prisma/client';

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
    const user = await prismaClient.user.findFirst({ where: { firebaseId } });

    if (!user || user.email != email) {
      !user ? logger.info('user created') : logger.info('user updated');
      return prismaClient.user.upsert({
        where: { firebaseId: firebaseId },
        update: { firebaseId: firebaseId, email: email },
        create: { firebaseId: firebaseId, email: email },
      });
    }

    return user;
  }
}
