/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRole, type User } from '@/server/db/schema';
import { type MyContextType } from '@/server/graphql/server';
import { type PubSubChannels } from '@/server/graphql/subscriptions/PubSubChannels';
import { defineAbilitiesFor } from '@/server/utils/caslAbility';
import { packRules } from '@casl/ability/extra';
import { type PubSub } from '@enalmada/next-gql/server';

import UserService from './user.service';

export const mockPubSub: PubSub<PubSubChannels> = {
  publish: () => {},
  subscribe: () => {
    const asyncIterator: AsyncIterator<any> = {
      next() {
        // Use a type assertion here if necessary
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return Promise.resolve({ done: false, value: {} as any });
      },
      return() {
        return Promise.resolve({ done: true, value: undefined });
      },
      throw(error) {
        return Promise.reject(error);
      },
      // @ts-expect-error doesn't exist
      [Symbol.asyncIterator]() {
        return this;
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return asyncIterator as any; // Use type assertion to bypass strict type checking
  },
};

export const mockUserId = 'usr_1';

export const fixedDate = new Date('2023-08-28T21:37:27.238Z');

export const mockUser: User = {
  id: mockUserId,
  name: 'name',
  email: 'email@email.com',
  image: null,
  firebaseId: 'random',
  role: UserRole.MEMBER,
  createdAt: fixedDate,
  createdBy: mockUserId,
  updatedAt: fixedDate,
  updatedBy: mockUserId,
  version: 1,
};

export const mockCtx: MyContextType = { currentUser: mockUser, pubSub: mockPubSub };

export const mockAdminUser: User = {
  ...mockUser,
  role: UserRole.ADMIN,
};
export const mockAdminCtx: MyContextType = { currentUser: mockAdminUser, pubSub: mockPubSub };

export const mockWrongCtx: MyContextType = {
  currentUser: {
    ...mockUser,
    id: 'wrong_usr_random',
  },
  pubSub: mockPubSub,
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
