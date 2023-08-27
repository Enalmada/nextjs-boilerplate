/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/server/db';
import { and, eq } from 'drizzle-orm';
import { type PgTableWithColumns } from 'drizzle-orm/pg-core';
import { type RelationalQueryBuilder } from 'drizzle-orm/pg-core/query-builders/query';

type CriteriaType<T> = keyof T;

const buildWhereClause = <T>(criteria: Partial<T>, table: PgTableWithColumns<any>) => {
  const conditions = Object.keys(criteria)
    .filter((key) => criteria[key as CriteriaType<T>] !== undefined)
    .map((key) => {
      const criteriaType = key as CriteriaType<T>;
      return eq(table[criteriaType], criteria[criteriaType]!);
    });

  if (conditions.length === 1) {
    return conditions[0];
  } else {
    return and(...conditions);
  }
};

export const createRepo = <T extends { [key: string]: any }, TI extends { [key: string]: any }>(
  table: PgTableWithColumns<any>,
  queryBuilder: RelationalQueryBuilder<any, any>
) => {
  return {
    findFirst: async (criteria: Partial<T>): Promise<T> => {
      const where = buildWhereClause(criteria, table);
      return queryBuilder.findFirst({ where }) as unknown as Promise<T>;
    },
    findMany: async (criteria: Partial<T>): Promise<T[]> => {
      const where = buildWhereClause(criteria, table);
      return queryBuilder.findMany({ where }) as unknown as Promise<T[]>;
    },
    create: async (createWith: TI): Promise<T> => {
      const inserted = await db.insert(table).values(createWith).returning();
      return inserted.shift()! as T;
    },
    update: async (id: string, updateWith: TI): Promise<T> => {
      const updated = await db.update(table).set(updateWith).where(eq(table.id, id)).returning();
      return updated.shift()! as T;
    },
    delete: async (id: string): Promise<T> => {
      const deleteResult = await db.delete(table).where(eq(table.id, id)).returning();
      return deleteResult.shift()! as T;
    },
  };
};
