'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type User } from '@/client/gql/generated/graphql';
import {
  createMongoAbility,
  type ExtractSubjectType,
  type MongoQuery,
  type Subject,
  type SubjectRawRule,
} from '@casl/ability';
import { unpackRules, type PackRule } from '@casl/ability/extra';

export const useAuthorization = (me?: User | null) => {
  const router = useRouter(); // For redirecting

  useEffect(() => {
    const ability = createMongoAbility();

    const updateAbility = () => {
      if (!me?.rules) return false;

      const rules = JSON.parse(me.rules as string) as PackRule<
        SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery>
      >[];
      const unpackedRules = unpackRules(rules);
      ability.update(unpackedRules);

      return ability.can('manage', 'all');
    };

    if (!updateAbility()) {
      router.push('/');
    }
  }, [router, me]);
};
