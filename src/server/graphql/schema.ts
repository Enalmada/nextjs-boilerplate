import { builder } from '@/server/graphql/builder';

import './sortAndPagination';
import '@/server/task/task.model';
import '@/server/user/user.model';

export const schema = builder.toSchema({});
