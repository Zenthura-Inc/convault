import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-purple-400/20 bg-purple-950 text-purple-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Copyright {new Date().getFullYear()} Convault. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="transition hover:text-white">
            Privacy
          </Link>
          <Link href="/pricing" className="transition hover:text-white">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
}
