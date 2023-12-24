import { builder } from '@/server/graphql/builder';

import './sortAndPagination';
import '@/server/graphql/subscriptions/notification';
import '@/server/admin/admin.model';
import '@/server/user/user.model';
/* clone-code ENTITY_HOOK
{
  "toPlacement": "below",
  "replacements": [
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
  ]
}
*/
import '@/server/task/task.model';

/* clone-code ENTITY_HOOK end */

export const schema = builder.toSchema({});
