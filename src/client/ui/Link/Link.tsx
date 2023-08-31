/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import NextLink from 'next/link';
import { Link as IntlLink } from '@/lib/localization/navigation';
import { Link as NextUILink, type LinkProps as NextUILinkProps } from '@nextui-org/react';

type OverriddenProps = 'href'; // Add any props you wish to override

type CombinedLinkProps = Omit<NextUILinkProps, OverriddenProps>;

interface LinkProps extends CombinedLinkProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  href: string | import('url').UrlObject;
}

export default function Link(props: LinkProps) {
  if (props.isExternal) {
    return (
      <NextUILink underline="hover" as={NextLink} {...(props as any)}>
        {props.children}
      </NextUILink>
    );
  } else {
    return (
      <NextUILink as={IntlLink} underline="hover" {...(props as any)}>
        {props.children}
      </NextUILink>
    );
  }
}
