import { TaskTable } from '@/client/admin/entity/task/TaskTable';
import { UserTable } from '@/client/admin/entity/user/UserTable';

interface Props {
  loading?: boolean;
  entity?: string;
}

export default function EntityTable({ loading, entity }: Props) {
  // loading pages currently don't get parameters but hopefully that changes
  // https://nextjs.org/docs/app/api-reference/file-conventions/loading
  if (loading) {
    // TODO return form skeleton
    return null;
  }

  switch (entity) {
    case 'user':
      return <UserTable />;
    /* clone-code ENTITY_HOOK
    {
      "toPlacement": "below",
      "replacements": [
        { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
        { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
      ]
    }
    */
    case 'task':
      return <TaskTable />;
    /* clone-code ENTITY_HOOK end */
    default:
      return 'Not Found';
  }
}
