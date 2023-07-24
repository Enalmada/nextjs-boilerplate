'use client';

// ^ this file needs the "use client" pragma
import { NextUIProvider } from '@nextui-org/react';

export function NextUIWrapper({ children }: React.PropsWithChildren) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
