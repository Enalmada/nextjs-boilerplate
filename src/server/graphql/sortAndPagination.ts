import { builder } from '@/server/graphql/builder';
import { type OrderBy, type Paging } from 'drizzle-helpers';

export enum SortOrder {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

builder.enumType(SortOrder, {
  name: 'SortOrder',
});

export interface OrderInput {
  sortBy: string;
  sortOrder: SortOrder;
}

export const OrderInputType = builder.inputRef<OrderInput>('OrderInput');

OrderInputType.implement({
  fields: (t) => ({
    sortBy: t.string({ required: true }),
    sortOrder: t.field({ type: SortOrder, required: true }),
  }),
});

export interface PaginationInput {
  page: number;
  pageSize: number;
}

export const PaginationInputType = builder.inputRef<PaginationInput>('PaginationInput');

PaginationInputType.implement({
  fields: (t) => ({
    page: t.int({ required: true }),
    pageSize: t.int({ required: true }),
  }),
});

export interface TableInput {
  order?: OrderInput | null;
  pagination?: PaginationInput | null;
}

export const DEFAULT_PAGE_SIZE = 1000;

// Map to Drizzle types
export function sortAndPagination(input?: TableInput) {
  const order: OrderBy = {
    sortBy: input?.order?.sortBy || 'id',
    sortOrder: input?.order?.sortOrder === SortOrder.ASC ? 'asc' : 'desc',
  };

  const paging: Paging = {
    page: input?.pagination?.page || 1,
    pageSize: input?.pagination?.pageSize || DEFAULT_PAGE_SIZE,
  };

  return { order, paging };
}
