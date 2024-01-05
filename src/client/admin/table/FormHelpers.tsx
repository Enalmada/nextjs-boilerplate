import Auditing, { type AuditedEntity } from '@/client/components/admin/Auditing';
import Edit from '@/client/components/admin/Edit';
import { type TableColumnProps } from '@enalmada/nextui-admin';

// Define a function that returns the array and takes a generic type T
export function getAuditProps<T extends AuditedEntity>(): TableColumnProps<T>[] {
  return [
    {
      key: 'auditing',
      // Ensure the type of 'task' is correctly inferred as T
      renderCell: (entity: T) => <Auditing entity={entity} />,
    },
    {
      key: 'actions',
      header: null,
      align: 'end',
      renderCell: () => <Edit />,
    },
  ];
}
