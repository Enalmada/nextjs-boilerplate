/* eslint-disable @typescript-eslint/no-explicit-any */

export function createMockRepository(entity: any) {
  return {
    findFirst: vi.fn((criteria) => {
      // Check if the ID matches 'clb_1'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (criteria?.id == entity.id) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return entity;
      } else {
        // Return undefined or null to simulate 'not found'
        return undefined;
      }
    }),
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
