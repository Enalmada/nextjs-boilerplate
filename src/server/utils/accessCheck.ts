import type Logger from '@/lib/logging/log-util';
import { type User } from '@/server/db/schema';
import { NotAuthorizedError } from '@/server/graphql/errors';
import { defineAbilitiesFor, type Action, type SubjectType } from '@/server/utils/caslAbility';
import { subject } from '@casl/ability';

export function accessCheck(
  logger: Logger,
  user: User | undefined,
  action: Action,
  subjectType: SubjectType,
  criteria: object = {},
  field?: string
) {
  const ability = defineAbilitiesFor(user);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-explicit-any
  if (ability.cannot(action, subject(subjectType as any, criteria as any), field)) {
    throw new NotAuthorizedError(`You do not have access to ${action} ${subjectType}.`, logger);
  }

  // Alternatively
  // ForbiddenError.from(ability).throwUnlessCan(action, subject(subjectType, criteria), field);
}
