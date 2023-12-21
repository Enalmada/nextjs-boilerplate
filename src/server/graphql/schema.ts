import { builder } from '@/server/graphql/builder';

import './sortAndPagination';
import '@/server/graphql/subscriptions/notification';
import '@/server/admin/admin.model';
import '@/server/user/user.model';
/* ENTITY_HOOK
{
  "toPlacement": "below",
  "replacements": [
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
  ]
}
*/
import '@/server/task/task.model';

/* ENTITY_HOOK end */

export const schema = builder.toSchema({});
