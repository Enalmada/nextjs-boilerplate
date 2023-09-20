import React from 'react';
import { type SortDescriptor } from '@nextui-org/react';
interface PagingDescriptor {
    pageDescriptor?: PageDescriptor;
    setPageDescriptor?: SetPageDescriptor;
    hasMore?: boolean;
}
export interface PageDescriptor {
    page: number;
    pageSize: number;
}
export interface RenderRowProps {
    item: NonNullable<unknown>;
    columnKey: string | React.Key;
}
export interface Column {
    key: string;
    label: string;
    align?: 'center' | 'start' | 'end';
    allowsSorting?: boolean;
}
type SetSortDescriptor = (sortDescriptor: SortDescriptor) => void;
type SetPageDescriptor = (pageDescriptor: PageDescriptor) => void;
interface TableWrapperProps<T> {
    sortDescriptor?: SortDescriptor;
    setSortDescriptor?: SetSortDescriptor;
    columns: Column[];
    items: T[] | undefined;
    renderRow: (props: {
        item: T;
        columnKey: string | React.Key;
    }) => React.ReactNode;
    emptyContent?: string;
    pagingDescriptor?: PagingDescriptor;
    isLoading?: boolean;
    linkFunction: (key: React.Key) => void;
}
export declare const TableWrapper: <T extends unknown>(props: TableWrapperProps<T>) => React.ReactElement;
export {};
