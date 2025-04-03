import { ThemeProvider } from "@/components/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { StackProvider } from "@stackframe/stack";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { stackServerApp } from "../stack";
import "./globals.css";

const dm = DM_Sans({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "AskJunior CMS",
  description: "Case management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dm.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackServerApp}>
            <>
              <EdgeStoreProvider>

                {children}
              </EdgeStoreProvider>
            </>
          </StackProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
