import ClientLayout from "@/components/ClientLayout";
import { StackProvider, StackTheme } from "@stackframe/stack";
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
    <html lang="en">
      <body
        className={`${dm.className} antialiased`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <ClientLayout>{children}</ClientLayout>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
