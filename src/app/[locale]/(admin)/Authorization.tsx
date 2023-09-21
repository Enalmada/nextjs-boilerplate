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
import type { MongoAbility } from '@casl/ability';
import { unpackRules, type PackRule } from '@casl/ability/extra';

interface Props {
  me?: User | null;
}

function hasManageAll(ability: MongoAbility): boolean {
  return ability.can('manage', 'all');
}

export default function Authorization({ me }: Props) {
  const ability = createMongoAbility();

  const updateAbility = () => {
    if (!me?.rules) return false;

    const rules = JSON.parse(me.rules as string) as PackRule<
      SubjectRawRule<string, SubjectType, unknown>
    >[];
    const unpackedRules = unpackRules(rules) as SubjectRawRule<
      string,
      ExtractSubjectType<Subject>,
      MongoQuery
    >[];
    ability.update(unpackedRules);

    return hasManageAll(ability);
  };

  if (!updateAbility()) {
    redirect('/');
  }

  return null;
}
