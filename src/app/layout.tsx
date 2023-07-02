import "@/client/styles/index.css";

import { ServerAuthProvider } from "@/auth/server-auth-provider";
import { ApolloWrapper } from "@/client/lib/apollo-wrapper";

export const metadata = {
  title: "Todo App",
  description: "Everyone loves a simple todo app exercise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={"gradient leading-normal tracking-normal text-white"}>
        <ServerAuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
