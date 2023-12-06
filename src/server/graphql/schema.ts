import { builder } from '@/server/graphql/builder';

import './sortAndPagination';
import '@/server/task/task.model';
import '@/server/user/user.model';
import '@/server/admin/admin.model';

export const schema = builder.toSchema({});
