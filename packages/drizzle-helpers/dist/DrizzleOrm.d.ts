import { type PgTableWithColumns } from 'drizzle-orm/pg-core';
import { type RelationalQueryBuilder } from 'drizzle-orm/pg-core/query-builders/query';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
export interface OrderBy {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
export interface Paging {
    page: number;
    pageSize: number;
}
export interface Config<T> {
    criteria?: Partial<T>;
    order?: OrderBy;
    paging?: Paging;
    limit?: number;
    offset?: number;
}
export interface Page<T> {
    result: T[];
    hasMore: boolean;
}
export declare const createRepo: <TSchema extends Record<string, unknown>, T extends {
    [key: string]: any;
}, TI extends {
    [key: string]: any;
}>(db: PostgresJsDatabase<TSchema>, table: PgTableWithColumns<any>, queryBuilder: RelationalQueryBuilder<T, any>) => {
    findFirst: (criteria: Partial<T>) => Promise<T>;
    findMany: (config?: Config<T> | undefined) => Promise<T[]>;
    findPage: (config?: Config<T> | undefined) => Promise<Page<T>>;
    create: (createWith: TI) => Promise<T>;
    update: (id: string, updateWith: TI) => Promise<T>;
    delete: (id: string) => Promise<T>;
};
