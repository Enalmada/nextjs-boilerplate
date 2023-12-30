/* eslint-disable @typescript-eslint/no-explicit-any */

export function createMockRepository(entity: any) {
  return {
    findFirst: vi.fn(() => Promise.resolve(entity)),
    findMany: vi.fn(() => Promise.resolve([entity])),
    findPage: vi.fn(() => Promise.resolve({ result: [entity], hasMore: false })),
    create: vi.fn(() => Promise.resolve(entity)),
    update: vi.fn(() => Promise.resolve(entity)),
    delete: vi.fn(() => Promise.resolve(entity)),
  };
}

describe('base.service', () => {
  it('TBD', () => {
    expect(true).toBe(true);
  });
});
