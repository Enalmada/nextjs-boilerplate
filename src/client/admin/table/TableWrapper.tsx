import React from 'react';
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type SortDescriptor,
} from '@nextui-org/react';

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
  renderRow: (props: { item: T; columnKey: string | React.Key }) => React.ReactNode;
  emptyContent?: string;
  pagingDescriptor?: PagingDescriptor;
  isLoading?: boolean;
  linkFunction: (key: React.Key) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const TableWrapper = <T extends unknown>(
  props: TableWrapperProps<T>
): React.ReactElement => {
  const {
    columns,
    items,
    renderRow,
    emptyContent,
    sortDescriptor,
    setSortDescriptor,
    pagingDescriptor,
    isLoading,
      linkFunction,
  } = props;

  const { pageDescriptor, setPageDescriptor, hasMore } = pagingDescriptor || {};

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    if (setSortDescriptor) {
      setSortDescriptor(sortDescriptor);
    }
  };

  return (
    <div className=" flex w-full flex-col gap-4">
      <Table
        sortDescriptor={sortDescriptor}
        onSortChange={(sortDescriptor: SortDescriptor) => handleSortChange(sortDescriptor)}
        aria-label="Table for model rows"
        selectionMode="single"
        onRowAction={(key) => linkFunction(key)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              hideHeader={column.key === 'actions'}
              align={column.align === 'center' ? 'center' : 'start'}
              allowsSorting={column.allowsSorting}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items || []}
          emptyContent={items ? emptyContent : ' '}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow>
              {(columnKey) => (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <TableCell>{renderRow({ item: item, columnKey: columnKey })}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mb-3 mt-3 flex items-center justify-center gap-2">
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          isDisabled={pageDescriptor?.page === 1}
          onPress={() => {
            if (pageDescriptor && setPageDescriptor) {
              const page = pageDescriptor.page > 1 ? pageDescriptor.page - 1 : pageDescriptor.page;
              setPageDescriptor({ ...pageDescriptor, page });
            }
          }}
        >
          Previous
        </Button>
        <div className="flex items-center text-gray-400">{pageDescriptor?.page}</div>
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          isDisabled={hasMore === false}
          onPress={() => {
            if (pageDescriptor && setPageDescriptor) {
              const page = pageDescriptor.page + 1;
              setPageDescriptor({ ...pageDescriptor, page });
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
