import { TaskStatus, UserRole, type User } from '@/server/db/schema';
import { type MyContextType } from '@/server/graphql/server';
import { defineAbilitiesFor } from '@/server/utils/caslAbility';
import { packRules } from '@casl/ability/extra';

import UserService from './user.service';

const mockTask = {
  id: 'tsk_1',
  title: 'Task 1',
  description: undefined,
  dueDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  status: TaskStatus.ACTIVE,
  version: 1,
  userId: 'usr_random',
};

const mockUser: User = {
  id: 'usr_random',
  name: 'name',
  email: 'email@email.com',
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
  firebaseId: 'random',
  role: UserRole.MEMBER,
};

const ability = defineAbilitiesFor(mockUser);
const rules = JSON.stringify(packRules(ability.rules));

vi.mock('./user.repository', () => {
  return {
    default: {
      findFirst: vi.fn(() => mockTask),
      findMany: vi.fn(() => [mockTask]),
      create: vi.fn(() => mockTask),
      update: vi.fn(() => mockTask),
      delete: vi.fn(() => mockTask),
    },
  };
});

describe('UserService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('me', () => {
    it('should return user for authorized user', () => {
      const service = new UserService();
      const ctx: MyContextType = { currentUser: mockUser };
      const result = service.me(ctx);
      expect(result).toEqual({
        ...mockUser,
        rules,
      });
    });
  });
});
