import Logger from '@/lib/logging/log-util';
import BaseService from '@/server/base/base.service';
import { db } from '@/server/db';
import { UserTable, type User, type UserInput } from '@/server/db/schema';
import { type MyContextType } from '@/server/graphql/server';
import { accessCheck } from '@/server/utils/accessCheck';
import { defineAbilitiesFor } from '@/server/utils/caslAbility';
import { packRules } from '@casl/ability/extra';

export default class UserService extends BaseService<User, UserInput> {
  constructor() {
    super('User', UserTable, db.query.UserTable);
  }

  async createOrGetFirebaseUser(firebaseId: string, email: string | undefined): Promise<User> {
    // TODO pass ctx here to log any suspicious ip, etc
    const logger = new Logger(UserService.name, undefined, { firebaseId, email });

    // TODO - send welcome email on new user creation
    // EmailService.sendWelcome()

    // To avoid an unnecessary update, we need to find first and compare incoming attributes that might be different
    const user = await this.repository.findFirst({ firebaseId });

    if (!user) {
      logger.info('user created');

      return this.repository.create({
        firebaseId: firebaseId,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else if (user.email != email) {
      logger.info('user updated');

      return this.repository.update(user.id, {
        email: email,
        updatedAt: new Date(),
        // updatedBy: user.id,
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
}
