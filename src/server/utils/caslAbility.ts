import { type Task, type User, type UserRole } from '@/server/db/schema';
import {
  AbilityBuilder,
  createMongoAbility,
  type ForcedSubject,
  type MongoAbility,
} from '@casl/ability';

export type Action = 'manage' | 'list' | 'read' | 'create' | 'update' | 'delete';

/* clone-code ENTITY_HOOK
{
  "addType": "<%= h.changeCase.pascalCase(name) %>"
}
*/
export type SubjectType = 'Task' | 'User' | 'all';

type AppAbilities = [
  Action,
  SubjectType | ForcedSubject<Exclude<SubjectType, 'all'>> | ForcedSubject<Task>,
];

export type AppAbility = MongoAbility<AppAbilities>;

type DefinePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void;
type Roles = UserRole.MEMBER | UserRole.ADMIN;

const rolePermissions: Record<Roles, DefinePermissions> = {
  MEMBER(user, { can }) {
    // USER
    can('read', 'User', { id: user.id });

    // TASK
    can('create', 'Task', { userId: user.id });
    can('list', 'Task', { userId: user.id });
    can('read', 'Task', { userId: user.id });
    can('update', 'Task', { userId: user.id });
    can('delete', 'Task', { userId: user.id });

    /* clone-code ENTITY_HOOK
    {
      "todo": "Add rolePermissions for <%= name %>"
    }
    */
  },
  ADMIN(user, { can }) {
    can('manage', 'all');
  },
};

export function defineAbilitiesFor(user: User | undefined) {
  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user) {
    if (typeof rolePermissions[user?.role] === 'function') {
      rolePermissions[user.role](user, builder);
    } else {
      throw new Error(`Trying to use unknown role "${user?.role}"`);
    }
  }

  return builder.build();
}
