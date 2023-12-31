/* clone-code ENTITY_HOOK
{
  "toFile": "src/server/<%= h.changeCase.camelCase(name) %>/<%= h.changeCase.camelCase(name) %>.service.test.ts",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
import { TaskStatus, type Task } from '@/server/db/schema';
import { NotAuthorizedError, OptimisticLockError } from '@/server/graphql/errors';
import { type MyContextType } from '@/server/graphql/server';
import {
  baseEntityMock,
  fixedDate,
  mockAdminCtx,
  mockCtx,
  mockPubSub,
  mockUserId,
  mockWrongCtx,
} from '@/server/user/user.service.test';
import { type Page } from '@enalmada/drizzle-helpers';

import TaskService from './task.service';

const mockTaskId = 'tsk_1';

export const mockTask: Task = {
  id: mockTaskId,
  title: 'Task 1',
  description: null,
  dueDate: fixedDate,
  status: TaskStatus.ACTIVE,
  userId: mockUserId,
  ...baseEntityMock,
};

const mockPage: Page<Task> = {
  hasMore: false,
  result: [mockTask],
};

vi.mock('./task.service', async () => {
  const { default: TaskService } = await import('./task.service');
  // Unsure why this started crashing without import here.  Seems like a vitest bug
  const { createMockRepository } = await import('../utils/mocks');

  class MockTaskService extends TaskService {
    constructor() {
      super();
      this.repository = createMockRepository(mockTask);
    }
  }

  return {
    default: MockTaskService,
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
      const ctx: MyContextType = { currentUser: null!, pubSub: mockPubSub };
      await expect(service.list(undefined, ctx)).rejects.toThrow(Error);
    });

    it('should throw NotAuthorizedError for member', async () => {
      const service = new TaskService();
      await expect(service.list(undefined, mockCtx)).rejects.toThrow(NotAuthorizedError);
    });

    it('should return tasks for admin users', async () => {
      const service = new TaskService();
      const result = await service.list(undefined, mockAdminCtx);
      expect(result).toEqual(mockPage);
    });
  });

  describe('task', () => {
    it('should throw NotAuthorizedError for unauthorized task read', async () => {
      const service = new TaskService();
      await expect(service.get(mockTaskId, mockWrongCtx)).rejects.toThrow(NotAuthorizedError);
    });

    it('should return task for authorized task read', async () => {
      const service = new TaskService();
      const result = await service.get(mockTaskId, mockCtx);
      expect(result).toEqual(mockTask);
    });
  });

  describe('create', () => {
    it('should return task for create', async () => {
      const service = new TaskService();
      const result = await service.create(mockTask, mockCtx);
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should throw NotAuthorizedError for unauthorized task update', async () => {
      const service = new TaskService();
      await expect(service.update(mockTaskId, mockTask, mockWrongCtx)).rejects.toThrow(
        NotAuthorizedError
      );
    });

    it('should throw OptimisticLockError for dirty update', async () => {
      const service = new TaskService();

      const input = {
        ...mockTask,
        version: 2,
      };

      await expect(service.update(mockTaskId, input, mockCtx)).rejects.toThrow(OptimisticLockError);
    });

    it('should return task for authorized task update', async () => {
      const service = new TaskService();
      const result = await service.update(mockTaskId, mockTask, mockCtx);
      expect(result).toEqual(mockTask);
    });
  });

  describe('delete', () => {
    it('should return task for delete', async () => {
      const service = new TaskService();
      const result = await service.delete(mockTaskId, mockCtx);
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
