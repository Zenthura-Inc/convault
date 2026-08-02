import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy & File Security - Convault",
  description: "Learn how Convault handles temporary files, secure access, and data minimization.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy & File Security
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          We built Convault to be simple, fast, and privacy-first.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <PrivacyCard title="Temporary files">
          Uploaded and converted files are held temporarily in memory during
          Phase 1. Jobs expire automatically, and converted results are cleared
          when the download endpoint returns them.
        </PrivacyCard>

        <PrivacyCard title="Secure access">
          Conversion jobs are protected with bearer tokens. Job tokens are sent
          in request headers, not query strings, so they are less likely to leak
          through URLs or browser history.
        </PrivacyCard>

        <PrivacyCard title="Data minimization">
          We store only what is needed for the active conversion job: basic file
          metadata, conversion status, temporary bytes, and cleanup timing.
        </PrivacyCard>

        <PrivacyCard title="No payments yet">
          Premium features are planned but not implemented. Today, the core
          converter is free.
        </PrivacyCard>
      </section>

      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 text-sm leading-7 text-zinc-700 shadow-[var(--shadow-soft)] dark:text-zinc-200">
        <p>
          If you have any questions about privacy, please check back later for
          updates as we expand documentation alongside new features.
        </p>
      </section>
    </div>
  );
}

function PrivacyCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: ReactNode;
}>) {
  return (
    <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        {children}
      </p>
    </article>
  );
}
