'use client';

import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from '@enalmada/next-themes';
import { type ThemeProviderProps } from '@enalmada/next-themes/dist/types';
import { NextUIProvider } from '@nextui-org/react';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function NextUIWrapper({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={(href) => router.push(href)}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
