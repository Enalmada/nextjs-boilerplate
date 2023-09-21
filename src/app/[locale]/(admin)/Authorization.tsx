import { useEffect, useMemo } from 'react';
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

export const useAuthorization = (me?: User | null) => {
  const hasAuthorization = useMemo(() => {
    const ability = createMongoAbility();

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

    return ability.can('manage', 'all');
  }, [me?.rules]);

  useEffect(() => {
    if (!hasAuthorization) {
      redirect('/');
    }
  }, [hasAuthorization]);
};