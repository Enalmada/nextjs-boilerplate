import "@/client/styles/index.css";
import "@mantine/core/styles.css";

import React from "react";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import { ApolloWrapper } from "@/client/lib/apollo-wrapper";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Todo App",
  description: "Everyone loves a simple todo app exercise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body className="gradient leading-normal tracking-normal text-white">
        <ServerAuthProvider>
          <ApolloWrapper>
            <MantineProvider>{children}</MantineProvider>
          </ApolloWrapper>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
