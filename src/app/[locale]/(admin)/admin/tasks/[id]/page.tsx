/* ENTITY_HOOK
{
  "toFile": "src/app/[locale]/(admin)/admin/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/[id]/page.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
import TaskForm from '@/app/[locale]/(admin)/admin/tasks/[id]/TaskForm';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';

interface Props {
  params: {
    id: string;
  };
}
export const metadata = {
  title: 'Task',
};

export default function Page(props: Props) {
  const id = props.params.id;
  return (
    <div className="mx-auto my-5 flex w-full max-w-[95rem] flex-col gap-4">
      <Breadcrumb
        routes={[getRouteById('AdminHome'), getRouteById('AdminTasks'), getRouteById('AdminTask')]}
      />

      <TaskForm id={id} />
    </div>
  );
}
