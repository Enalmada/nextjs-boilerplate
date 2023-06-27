import "@/client/styles/index.css";

import { ApolloWrapper } from "@/client/lib/apollo-wrapper";

import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "Todo App",
  description: "Everyone loves a simple todo app exercise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={"gradient leading-normal tracking-normal text-white"}>
        <NextAuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
