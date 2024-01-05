import type { Metadata } from 'next';

import EntityForm from './EntityForm';

type Props = {
  params: { entity: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const { entity, id } = params;

  return {
    title: `${entity} ${id}`,
  };
}

export default function Page({ params }: Props) {
  const { entity, id } = params;

  return <EntityForm entity={entity} id={id} />;
}
