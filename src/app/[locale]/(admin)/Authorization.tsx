import { redirect } from 'next/navigation';
import { type User } from '@/client/gql/generated/graphql';
import {
  createMongoAbility,
  type ExtractSubjectType,
  type MongoQuery,
  type Subject,
  type SubjectRawRule,
  type SubjectType,
} from '@casl/ability';
import { unpackRules, type PackRule } from '@casl/ability/extra';
import { type MongoAbility } from '@casl/ability';

interface Props {
  me?: User | null;
}

function hasManageAll(me: User | null | undefined, ability: MongoAbility): boolean {
  if (!me?.rules) return false;
  return ability.can('manage', 'all');
}

export default function Authorization({ me }: Props) {
  const ability = createMongoAbility();

  if (me?.rules) {
    // TODO make me.rules the real type
    const rules = JSON.parse(me.rules as string) as PackRule<SubjectRawRule<string, SubjectType, unknown>>[];
    const unpackedRules = unpackRules(rules) as SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery>[];
    ability.update(unpackedRules);
  }

  if (!hasManageAll(me, ability)) {
    redirect('/');
  }

  return <></>;
}
