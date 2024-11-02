import type { Metadata } from "next";

import EntityTable from "./EntityTable";

type Props = {
	params: Promise<{ entity: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const entity = params.entity;

	return {
		title: `${entity} list`,
	};
}

export default async function Page(props: Props) {
	const params = await props.params;
	const entity = params.entity;

	return <EntityTable entity={entity} />;
}
