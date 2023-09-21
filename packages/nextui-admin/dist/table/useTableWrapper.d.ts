import React from 'react';
import { SortDescriptor } from '@nextui-org/react';
import { PageDescriptor, TableWrapperProps } from './TableWrapper';
export declare function useTableWrapper<T extends unknown>(): {
    TableWrapperComponent: React.FC<TableWrapperProps<T>>;
    sortDescriptor: SortDescriptor;
    setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor>>;
    pageDescriptor: PageDescriptor;
    setPageDescriptor: React.Dispatch<React.SetStateAction<PageDescriptor>>;
};
