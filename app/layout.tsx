import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/Container";
import "./globals.css";

export const metadata: Metadata = buildMetadata(siteConfig());

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { siteName } = siteConfig();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200">
          <Container className="flex h-16 items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              {siteName}
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <Link href="/about" className="hover:text-slate-900">
                About
              </Link>
            </nav>
          </Container>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200">
          <Container className="flex h-16 items-center text-sm text-slate-500">
            Built and maintained by Viprasol Tech.
          </Container>
        </footer>
      </body>
    </html>
  );
}
