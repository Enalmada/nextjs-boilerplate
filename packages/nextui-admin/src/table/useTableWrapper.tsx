import React, { useState } from 'react';
import { SortDescriptor } from '@nextui-org/react';

import { PageDescriptor, TableWrapper, TableWrapperProps } from './TableWrapper';

export function useTableWrapper<T extends unknown>() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'descending',
  });

  const [pageDescriptor, setPageDescriptor] = useState<PageDescriptor>({
    page: 1,
    pageSize: 50,
  });

  const TableWrapperComponent: React.FC<TableWrapperProps<T>> = (props) => {
    return (
      <TableWrapper<T>
        {...props}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        pageDescriptor={pageDescriptor}
        setPageDescriptor={setPageDescriptor}
      />
    );
  };

  return {
    TableWrapperComponent,
    sortDescriptor,
    setSortDescriptor,
    pageDescriptor,
    setPageDescriptor,
  };
}
