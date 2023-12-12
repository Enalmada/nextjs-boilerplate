import Logger from '@/lib/logging/log-util';
import { type User, type UserInput } from '@/server/db/schema';
import { NotFoundError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/server';
import { sortAndPagination, type TableInput } from '@/server/graphql/sortAndPagination';
import { accessCheck } from '@/server/utils/accessCheck';
import { defineAbilitiesFor } from '@/server/utils/caslAbility';
import { packRules } from '@casl/ability/extra';
import { type Page } from '@enalmada/drizzle-helpers';

import UserRepository from './user.repository';

export interface UsersInput extends TableInput {
  where?: Partial<User>;
}

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

  async users(input: UsersInput | undefined, ctx: MyContextType): Promise<Page<User>> {
    const logger = this.logger.logMethodStart(this.users.name, ctx, { ...input });

    accessCheck(logger, ctx.currentUser, 'list', 'User', input?.where);

    const { order, paging } = sortAndPagination(input);

    return UserRepository.findPage({ criteria: input?.where, order, paging });
  }

  async user(id: string, ctx: MyContextType) {
    const logger = this.logger.logMethodStart(this.user.name, ctx);

    const user = await UserRepository.findFirst({ id });

    if (!user) {
      throw new NotFoundError(`user ${id} not found`, logger);
    }

    accessCheck(logger, ctx.currentUser, 'read', 'User', user);

    return user;
  }

  async update(id: string, input: UserInput, ctx: MyContextType): Promise<User> {
    const logger = this.logger.logMethodStart(this.update.name, ctx, {
      data: { id, ...input },
    });

    const user = await UserRepository.findFirst({ id });

    if (!user) {
      throw new NotFoundError(`task ${id} not found`, logger);
    }

    if (user.version !== input.version) {
      // TODO notify user that task has changed in another tab, device, or session.
      throw new OptimisticLockError(
        `User has changed since loading.  Please reload and try again.`,
        logger
      );
    }

    accessCheck(logger, ctx.currentUser, 'update', 'User', user);

    const updateWith = {
      ...input,
      updatedAt: new Date(),
      version: user.version + 1,
    };

    return UserRepository.update(id, updateWith);
  }
}
