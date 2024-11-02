import TaskForm from "@/client/components/tasks/TaskForm";
import { Breadcrumb } from "@/client/ui";
import { getRouteById } from "@/client/utils/routes";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export const metadata = {
	title: "Task",
};

// TODO - this use of Suspense should be loading.ts instead
export default async function Page(props: Props) {
	const id = (await props.params).id;
	return (
		<>
			<Breadcrumb routes={[getRouteById("Home"), getRouteById("Task")]} />

			<Suspense>
				<TaskForm id={id} />
			</Suspense>
		</>
	);
}
