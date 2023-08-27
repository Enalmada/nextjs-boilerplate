import { test } from 'vitest';

import { nanoString } from '../schema'; // Import the actual function you're testing

test('nanoString generates string that starts with prefix', () => {
  const prefix = 'test';
  const result = nanoString(prefix);

  if (!result.startsWith(prefix)) {
    throw new Error(`Expected result to start with ${prefix}, but got ${result}`);
  }
});

test('nanoString generates string with length >= 21', () => {
  const prefix = 'test';
  const result = nanoString(prefix);

  if (result.length < 21) {
    throw new Error(`Expected result length to be >= 21, but got length ${result.length}`);
  }
});
