import NextLink from 'next/link';
import { Link as NextUILink, type LinkProps as NextUILinkProps } from '@nextui-org/link';

interface LinkProps extends NextUILinkProps {
  children?: React.ReactNode;
}

export default function Link(props: LinkProps) {
  return (
    <NextUILink underline="hover" as={NextLink} {...props}>
      {props.children}
    </NextUILink>
  );
}
