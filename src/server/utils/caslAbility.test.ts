import { UserRole, type Task, type User } from '@/server/db/schema';
import { defineAbilitiesFor, type AppAbility } from '@/server/utils/caslAbility';
import { subject } from '@casl/ability';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Permissions', () => {
  let user: User;
  let task: Task;
  let otherTask: Task;
  let ability: AppAbility;

  describe('when user is an admin', () => {
    beforeEach(() => {
      user = { id: 'usr_id', role: UserRole.ADMIN } as User;
      ability = defineAbilitiesFor(user);
    });

    it('can do anything', () => {
      expect(ability.can('manage', 'all')).to.be.true;
    });
  });

  describe('when user is a member', () => {
    beforeEach(() => {
      user = { id: 'usr_id', role: UserRole.MEMBER } as User;
      task = { userId: user.id } as Task;
      otherTask = { userId: 'usr_other' } as Task;
      ability = defineAbilitiesFor(user);
    });

    it('can crud own stuff', () => {
      expect(ability.can('list', subject('Task', task))).to.be.true;
      expect(ability.can('read', subject('Task', task))).to.be.true;
      expect(ability.can('update', subject('Task', task))).to.be.true;
      expect(ability.can('create', subject('Task', task))).to.be.true;
      expect(ability.can('delete', subject('Task', task))).to.be.true;
    });

    it('can not crud other stuff', () => {
      expect(ability.can('list', subject('Task', otherTask))).to.be.false;
      expect(ability.can('read', subject('Task', otherTask))).to.be.false;
      expect(ability.can('update', subject('Task', otherTask))).to.be.false;
      expect(ability.can('create', subject('Task', otherTask))).to.be.false;
      expect(ability.can('delete', subject('Task', otherTask))).to.be.false;
    });
  });
});
