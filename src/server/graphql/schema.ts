import { builder, SubGraph } from '@/server/graphql/builder';

import './sortAndPagination';
import '@/server/graphql/subscriptions/notification';
import '@/server/task/task.model';
import '@/server/user/user.model';
import '@/server/admin/admin.model';

export const publicSchema = builder.toSchema({ subGraph: SubGraph.PUBLIC });
export const privateSchema = builder.toSchema({ subGraph: [SubGraph.PUBLIC, SubGraph.PRIVATE] });
