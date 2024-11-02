import type { Metadata } from "next";

import EntityForm from "./EntityForm";

type Props = {
	params: Promise<{ entity: string; id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const { entity, id } = params;

	return {
		title: `${entity} ${id}`,
	};
}

export default async function Page(props: Props) {
	const params = await props.params;
	const { entity, id } = params;

	return <EntityForm entity={entity} id={id} />;
}
