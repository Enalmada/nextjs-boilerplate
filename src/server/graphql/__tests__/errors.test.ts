import type Logger from '@/lib/logging/log-util';
import { test, vi } from 'vitest';

import { NotAuthorizedError, NotFoundError, OptimisticLockError } from '../errors';

// Using ViTest's mocking function
const mockLogger: Logger = {
  debug: vi.fn(),
  warn: vi.fn(),
  trace: vi.fn(),
  info: vi.fn(),
  error: vi.fn(),
} as unknown as Logger;

test('NotAuthorizedError initializes correctly', () => {
  const message = 'You are not authorized';

  // Create a new instance of the NotAuthorizedError
  const error = new NotAuthorizedError(message, mockLogger);

  // Check that the error properties are set correctly
  if (error.message !== message) {
    throw new Error(`Expected message to be ${message}, got ${error.message}`);
  }

  if (error.extensions?.code !== 'NOT_AUTHORIZED') {
    throw new Error('Error code was not set correctly');
  }

  if (error.extensions?.http?.status !== 401) {
    throw new Error('HTTP status was not set correctly');
  }

  vi.restoreAllMocks();
});

test('NotFoundError initializes correctly', () => {
  const message = 'You are not found';

  // Create a new instance of the NotAuthorizedError
  const error = new NotFoundError(message, mockLogger);

  // Check that the error properties are set correctly
  if (error.message !== message) {
    throw new Error(`Expected message to be ${message}, got ${error.message}`);
  }

  if (error.extensions?.code !== 'NOT_FOUND') {
    throw new Error('Error code was not set correctly');
  }

  if (error.extensions?.http?.status !== 404) {
    throw new Error('HTTP status was not set correctly');
  }

  vi.restoreAllMocks();
});

test('OptimisticLockError initializes correctly', () => {
  const message = 'You are already changed';

  // Create a new instance of the NotAuthorizedError
  const error = new OptimisticLockError(message, mockLogger);

  // Check that the error properties are set correctly
  if (error.message !== message) {
    throw new Error(`Expected message to be ${message}, got ${error.message}`);
  }

  if (error.extensions?.code !== 'OPTIMISTIC_LOCK') {
    throw new Error('Error code was not set correctly');
  }

  if (error.extensions?.http?.status !== 409) {
    throw new Error('HTTP status was not set correctly');
  }

  vi.restoreAllMocks();
});
