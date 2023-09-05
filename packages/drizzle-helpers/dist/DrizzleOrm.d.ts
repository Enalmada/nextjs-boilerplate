import { type PgTableWithColumns } from 'drizzle-orm/pg-core';
import { type RelationalQueryBuilder } from 'drizzle-orm/pg-core/query-builders/query';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
export declare const createRepo: <T extends {
    [key: string]: any;
}, TI extends {
    [key: string]: any;
}>(db: PostgresJsDatabase<T>, table: PgTableWithColumns<any>, queryBuilder: RelationalQueryBuilder<T, any>) => {
    findFirst: (criteria: Partial<T>) => Promise<T>;
    findMany: (criteria: Partial<T>) => Promise<T[]>;
    create: (createWith: TI) => Promise<T>;
    update: (id: string, updateWith: TI) => Promise<T>;
    delete: (id: string) => Promise<T>;
};
