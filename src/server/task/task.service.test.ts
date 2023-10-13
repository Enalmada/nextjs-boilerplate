import { TaskStatus, UserRole, type Task, type User } from '@/server/db/schema';
import { NotAuthorizedError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/server';
import { type Page } from '@enalmada/drizzle-helpers';

import TaskService from './task.service';

const mockTask: Task = {
  id: 'tsk_1',
  title: 'Task 1',
  description: null,
  dueDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  status: TaskStatus.ACTIVE,
  version: 1,
  userId: 'usr_1',
};

const mockUser: User = {
  id: 'usr_1',
  name: 'name',
  email: 'email@email.com',
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
  firebaseId: 'random',
  role: UserRole.MEMBER,
};

const mockPage: Page<Task> = {
  hasMore: false,
  result: [mockTask],
};

vi.mock('./task.repository', () => {
  return {
    default: {
      findFirst: vi.fn(() => mockTask),
      findMany: vi.fn(() => [mockTask]),
      findPage: vi.fn(() => mockPage),
      create: vi.fn(() => mockTask),
      update: vi.fn(() => mockTask),
      delete: vi.fn(() => mockTask),
    },
  };
});

describe('TaskService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('tasks', () => {
    // TODO - no user passed should be prevented higher up
    it('should throw Error if no user is provided', async () => {
      const service = new TaskService();
      const ctx: MyContextType = { currentUser: null! };
      await expect(service.tasks(null!, undefined, ctx)).rejects.toThrow(Error);
    });

    it('should throw NotAuthorizedError for member', async () => {
      const service = new TaskService();
      const ctx: MyContextType = { currentUser: mockUser };
      await expect(service.tasks(mockUser, undefined, ctx)).rejects.toThrow(NotAuthorizedError);
    });

    it('should return tasks for admin users', async () => {
      const service = new TaskService();
      const adminUser: User = {
        ...mockUser,
        role: UserRole.ADMIN,
      };
      const ctx: MyContextType = { currentUser: adminUser };
      const result = await service.tasks(adminUser, undefined, ctx);
      expect(result).toEqual(mockPage);
    });
  });

  describe('task', () => {
    it('should throw NotAuthorizedError for unauthorized task read', async () => {
      const service = new TaskService();
      const wrongUser: User = {
        ...mockUser,
        id: 'wrong_usr_random',
      };
      const ctx: MyContextType = { currentUser: wrongUser };

      await expect(service.task(wrongUser, '1', ctx)).rejects.toThrow(NotAuthorizedError);
    });

    it('should return task for authorized task read', async () => {
      const service = new TaskService();
      const ctx: MyContextType = { currentUser: mockUser };

      const result = await service.task(mockUser, '1', ctx);
      expect(result).toEqual(mockTask);
    });
  });

  describe('create', () => {
    it('should return task for create', async () => {
      const service = new TaskService();
      const ctx: MyContextType = { currentUser: mockUser };
      const input = {
        ...mockTask,
      };
      const result = await service.create(mockUser, input, ctx);
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should throw NotAuthorizedError for unauthorized task update', async () => {
      const service = new TaskService();
      const wrongUser: User = {
        ...mockUser,
        id: 'wrong_usr_random',
      };
      const input = {
        ...mockTask,
      };
      const ctx: MyContextType = { currentUser: wrongUser };

      await expect(service.update(wrongUser, 'tsk_1', input, ctx)).rejects.toThrow(
        NotAuthorizedError
      );
    });

    it('should throw OptimisticLockError for dirty update', async () => {
      const service = new TaskService();

      const input = {
        ...mockTask,
        version: 2,
      };
      const ctx: MyContextType = { currentUser: mockUser };

      await expect(service.update(mockUser, 'tsk_1', input, ctx)).rejects.toThrow(
        OptimisticLockError
      );
    });

    it('should return task for authorized task update', async () => {
      const service = new TaskService();
      const ctx: MyContextType = { currentUser: mockUser };
      const input = {
        ...mockTask,
      };
      const result = await service.update(mockUser, 'tsk_1', input, ctx);
      expect(result).toEqual(mockTask);
    });
  });

  describe('delete', () => {
    it('should return task for delete', async () => {
      const service = new TaskService();
      const ctx: MyContextType = { currentUser: mockUser };
      const result = await service.delete(mockUser, 'tsk_1', ctx);
      expect(result).toEqual(mockTask);
    });
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
