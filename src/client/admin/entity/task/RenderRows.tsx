/* clone-code ENTITY_HOOK
{
  "toFile": "src/client/admin/entity/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/RenderRows.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import { getAuditProps } from "@/client/admin/table/FormHelpers";
import Chip from "@/client/components/admin/Chip";
import type { TableColumnProps } from "@enalmada/nextui-admin";
import { Link } from "@nextui-org/react";
import type { ResultOf } from 'gql.tada';
import { TASK } from '@/client/gql/client-queries.gql';

type Task = ResultOf<typeof TASK>;
import type { introspection } from "@/client/gql/generated/graphql-env.d.ts";
type TaskStatus = introspection['TaskStatus'];
import schema from "@/client/gql/generated/schema.json";

// This gets the enum values
const TaskStatus = {
	...Object.fromEntries(
		schema.__schema.types
			.find(t => t.name === 'TaskStatus')
			?.enumValues?.map(v => [v.name, v.name]) ?? []
	)
} satisfies Record<TaskStatus, TaskStatus>;

export const columnProps: TableColumnProps<Task>[] = [
	{ key: "title", allowsSorting: true },
	{ key: "description" },
	{
		key: "status",
		allowsSorting: true,
		renderCell: (task: Task) => (
			<Chip
				color={task.status === TaskStatus.Completed ? "success" : "primary"}
				label={task.status}
			/>
		),
	},
	{ key: "dueDate", allowsSorting: true },
	{
		key: "user",
		renderCell: (task: Task) => (
			<Link href={`/admin/user?id=${task?.user?.id}`}>{task?.user?.email}</Link>
		),
	},
	...getAuditProps<Task>(),
];
