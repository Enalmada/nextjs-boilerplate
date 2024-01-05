import type { Metadata } from 'next';

import EntityTable from './EntityTable';

type Props = {
  params: { entity: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const entity = params.entity;

  return {
    title: `${entity} list`,
  };
}

export default function Page({ params }: Props) {
  const entity = params.entity;

  return <EntityTable entity={entity} />;
}
