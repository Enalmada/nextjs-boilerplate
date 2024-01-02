/* clone-code ENTITY_HOOK
{
  "toFile": "src/app/[locale]/(admin)/admin/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/loading.tsx",
}
*/

import { TaskTable } from './TaskTable';

export default function Loading() {
  return <TaskTable loading={true} />;
}
