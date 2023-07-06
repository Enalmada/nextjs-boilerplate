import "@/client/styles/index.css";

import { Inter, Roboto_Mono } from "next/font/google";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import { ApolloWrapper } from "@/client/lib/apollo-wrapper";

export const metadata = {
  title: "Todo App",
  description: "Everyone loves a simple todo app exercise.",
};

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${roboto_mono.variable} gradient leading-normal tracking-normal text-white`}
      >
        <ServerAuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
