import TaskForm from '@/client/admin/entity/task/TaskForm';
import UserForm from '@/client/admin/entity/user/UserForm';

interface Props {
  loading?: boolean;
  entity?: string;
  id?: string;
}

export default function EntityForm({ loading, entity, id }: Props) {
  // loading pages currently don't get parameters but hopefully that changes
  // https://nextjs.org/docs/app/api-reference/file-conventions/loading
  if (loading) {
    // TODO return table skeleton
    return null;
  }

  switch (entity) {
    case 'user':
      return <UserForm id={id} />;
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
      return <TaskForm id={id} />;
    /* clone-code ENTITY_HOOK end */
    default:
      return 'Not Found';
  }
}
