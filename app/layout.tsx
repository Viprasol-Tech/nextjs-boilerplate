import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { buildMetadata, buildWebSiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { Container } from "@/components/Container";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = buildMetadata(siteConfig());

/**
 * Runs before hydration to apply the persisted theme class, preventing a
 * flash of the wrong theme on first paint.
 */
const noFlashScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var d=t==="dark"||((t===null||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const config = siteConfig();
  const jsonLd = buildWebSiteJsonLd(config);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <header className="border-b border-slate-200 dark:border-slate-800">
            <Container className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                {config.siteName}
              </Link>
              <nav className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <Link
                  href="/"
                  className="hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="hover:text-slate-900 dark:hover:text-slate-100"
                >
                  About
                </Link>
                <Link
                  href="/status"
                  className="hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Status
                </Link>
                <ThemeToggle />
              </nav>
            </Container>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-200 dark:border-slate-800">
            <Container className="flex h-16 items-center text-sm text-slate-500 dark:text-slate-400">
              Built and maintained by Viprasol Tech.
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
