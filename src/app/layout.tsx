import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://convault.app"),
  title: "Convault - Fast File Converter",
  description: "A fast, simple, privacy-first file converter.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <ThemeProvider>
          <div className="flex min-h-full flex-col">
            <a
              href="#main-content"
              className="sr-only z-50 rounded-lg bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
              Skip to main content
            </a>
            <SiteHeader />
            <main
              id="main-content"
              className="flex flex-1 flex-col px-4 pb-12 pt-8 sm:px-6 sm:pt-10"
            >
              <div className="mx-auto w-full max-w-6xl">{children}</div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
