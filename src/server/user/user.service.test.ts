import { UserRole, type User } from '@/server/db/schema';
import { type MyContextType } from '@/server/graphql/server';
import { defineAbilitiesFor } from '@/server/utils/caslAbility';
import { packRules } from '@casl/ability/extra';

import UserService from './user.service';

export const mockUserId = 'usr_1';

export const mockUser: User = {
  id: mockUserId,
  name: 'name',
  email: 'email@email.com',
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
  firebaseId: 'random',
  role: UserRole.MEMBER,
};

export const mockCtx: MyContextType = { currentUser: mockUser };

export const mockAdminUser: User = {
  ...mockUser,
  role: UserRole.ADMIN,
};
export const mockAdminCtx: MyContextType = { currentUser: mockAdminUser };

export const mockWrongCtx: MyContextType = {
  currentUser: {
    ...mockUser,
    id: 'wrong_usr_random',
  },
};

const ability = defineAbilitiesFor(mockUser);
const rules = JSON.stringify(packRules(ability.rules));

vi.mock('./user.repository', () => {
  return {
    default: {
      findFirst: vi.fn(() => mockUser),
      findMany: vi.fn(() => [mockUser]),
      create: vi.fn(() => mockUser),
      update: vi.fn(() => mockUser),
      delete: vi.fn(() => mockUser),
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
      const result = service.me(mockCtx);
      expect(result).toEqual({
        ...mockUser,
        rules,
      });
    });
  });
});
