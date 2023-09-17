import { redirect } from 'next/navigation';
import { type User } from '@/client/gql/generated/graphql';
import {
  createMongoAbility,
  type ExtractSubjectType,
  type MongoQuery,
  type Subject,
  type SubjectRawRule,
} from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';

interface Props {
  me?: User | null;
}

export default function Authorization({ me }: Props) {
  // eslint-disable-next-line  @typescript-eslint/no-unnecessary-type-assertion
  const rules = me?.rules ? JSON.parse(me.rules as string) : undefined;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const unpackedRules = unpackRules(rules);

  const ability = createMongoAbility().update(
    unpackedRules as SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery>[]
  );

  if (ability.cannot('manage', 'all')) {
    redirect('/');
  }

  return <></>;
}
