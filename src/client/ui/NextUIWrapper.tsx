'use client';

import { ThemeProvider as NextThemesProvider } from '@enalmada/next-themes';
import { type ThemeProviderProps } from '@enalmada/next-themes/dist/types';
import { NextUIProvider } from '@nextui-org/react';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function NextUIWrapper({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
