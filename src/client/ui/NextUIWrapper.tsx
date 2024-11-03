"use client";

import { ThemeProvider as NextThemesProvider } from "@enalmada/next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren, ReactNode } from "react";

// Manually defining based on chatgpt.  Could export this manually in the future
interface ValueObject {
	[themeName: string]: string;
}

type Attribute = `data-${string}` | "class";

interface ThemeProviderProps extends PropsWithChildren {
	themes?: string[] | undefined;
	forcedTheme?: string | undefined;
	enableSystem?: boolean | undefined;
	disableTransitionOnChange?: boolean | undefined;
	enableColorScheme?: boolean | undefined;
	storageKey?: string | undefined;
	defaultTheme?: string | undefined;
	attribute?: Attribute | Attribute[] | undefined;
	value?: ValueObject | undefined;
	nonce?: string | undefined;
}

export interface ProvidersProps {
	children: ReactNode;
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
