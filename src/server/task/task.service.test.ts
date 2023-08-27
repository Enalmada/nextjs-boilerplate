import { type User } from '@/server/db/schema';
import { NotAuthorizedError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/yoga';
import { afterEach, describe, expect, it, vi } from 'vitest';

/*
vi.mock('./task.repository', () => {
    return {
        findMany: vi.fn().mockImplementation((params) => {
            if (params.userId === 'someExpectedUserId') {
                return Promise.resolve(mockTasks);
            } else {
                return Promise.resolve([]);
            }
        }),
        // Add other methods as needed
    };
});

 */

import TaskService from './task.service';

const mockTasks = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
];

vi.mock('./task.repository', () => {
  return {
    default: {
      findMany: vi.fn(() => mockTasks),
    },
  };
});

describe('TaskService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw NotAuthorizedError if no user is provided', async () => {
    const service = new TaskService();
    const ctx: MyContextType = { currentUser: null! };

    await expect(service.tasks(null!, ctx)).rejects.toThrow(NotAuthorizedError);
  });

  it('should return tasks for authorized users', async () => {
    const service = new TaskService();
    const user: User = {
      id: 'usr_random',
      name: 'name',
      email: 'email@email.com',
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      firebaseId: 'random',
    };
    const ctx: MyContextType = { currentUser: user };

    const result = await service.tasks(user, ctx);
    expect(result).toEqual(mockTasks);
  });
});

//import type Logger from '@/lib/logging/log-util';

/*
// Your mock logger
const mockLogger: Logger = {
    debug: vi.fn(),
    warn: vi.fn(),
    trace: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
} as unknown as Logger;

vi.mock('@/lib/logging/log-util', () => {
    return class Logger {
        constructor() {
            return mockLogger;
        }
    };
});

 */
