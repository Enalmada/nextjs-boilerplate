import Logger from '@/lib/logging/log-util';
import { type User } from '@/server/db/schema';
import { type MyContextType } from '@/server/graphql/yoga';
import { accessCheck } from '@/server/utils/accessCheck';
import { defineAbilitiesFor } from '@/server/utils/caslAbility';
import { packRules } from '@casl/ability/extra';

import UserRepository from './user.repository';

export default class UserService {
  private readonly logger = new Logger(UserService.name);

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

  me(ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.me.name, ctx);

    if (!ctx.currentUser) {
      return undefined;
    }

    const criteria = { id: ctx.currentUser.id };

    accessCheck(logger, ctx.currentUser, 'read', 'User', criteria);

    const ability = defineAbilitiesFor(ctx.currentUser);
    const rules = JSON.stringify(packRules(ability.rules));

    return {
      ...ctx.currentUser,
      rules,
    };
  }

  async users(user: User, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.users.name, ctx);

    accessCheck(logger, user, 'list', 'User', {});

    return UserRepository.findMany();
  }
}
