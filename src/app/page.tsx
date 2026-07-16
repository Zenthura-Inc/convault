import { ConverterCard } from "@/components/converter-card";

const formatGroups = [
  { title: "Documents", formats: ["PDF", "DOCX", "TXT"] },
  { title: "Images", formats: ["JPG", "PNG", "WEBP", "GIF"] },
  { title: "Videos", formats: ["MP4", "MOV", "AVI"] },
  { title: "Audio", formats: ["MP3", "WAV"] },
];

const benefits = [
  {
    icon: "01",
    title: "Lightning Fast",
    description: "Convert files quickly with a streamlined conversion pipeline.",
  },
  {
    icon: "02",
    title: "Secure & Private",
    description: "Files are intended to be temporary and deleted automatically.",
  },
  {
    icon: "03",
    title: "Simple Workflow",
    description: "Upload, select a format, convert, and download.",
  },
];

const testimonials = [
  {
    quote: "Fast, reliable, and secure. Exactly what I need for client work.",
    name: "Michael Rodriguez",
    role: "Freelance Designer",
  },
  {
    quote: "Clean interface and quick results. Perfect for quick format changes.",
    name: "Emily Watson",
    role: "Content Creator",
  },
  {
    quote: "The workflow is simple. Upload, convert, download - done.",
    name: "Sarah Chen",
    role: "Marketing Manager",
  },
];

export default function Home() {
  return (
    <div className="space-y-14 sm:space-y-16">
      <section className="overflow-hidden rounded-3xl border border-purple-800 bg-purple-700 px-6 py-12 text-white shadow-sm sm:px-10 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-purple-50">
            Trusted flow: Upload - Convert - Download
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Convert Files
            <span className="block text-purple-100">Instantly & Securely</span>
          </h1>
          <p className="mt-5 text-base leading-8 text-purple-50 sm:text-lg">
            Transform files in seconds. No software to install, no registration
            required for basic conversions. Files are intended to be deleted
            automatically after a short time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#converter"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50 active:scale-[0.98] sm:w-auto"
            >
              Start Converting Now
            </a>
            <a
              href="/privacy"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/30 bg-purple-800 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-900 active:scale-[0.98] sm:w-auto"
            >
              Privacy & Security
            </a>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-purple-50 sm:grid-cols-3">
            {["No registration required", "Files auto-delete", "Multiple formats"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="converter" className="scroll-mt-28 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Upload & Convert
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Drag and drop your files or click to browse. We&apos;ll handle the rest.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900/50">
            <ConverterCard />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Supported Formats
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Convert between common formats with professional-grade quality.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formatGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-purple-200 dark:border-white/10 dark:bg-zinc-950 dark:hover:border-purple-500/40"
            >
              <p className="text-sm font-semibold">{group.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800 dark:border-purple-500/30 dark:bg-purple-950/40 dark:text-purple-100"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Why Choose Convault?
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Professional file conversion with security-focused defaults.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-sm font-bold text-purple-700 dark:bg-purple-950/50 dark:text-purple-200">
                {benefit.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Loved by Professionals
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            A simple converter people can rely on for daily work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950"
            >
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">{testimonial.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {testimonial.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-purple-800 bg-purple-700 p-8 text-center text-white shadow-sm sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to Convert?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-purple-50">
          Start converting files instantly. No account required for basic
          conversions.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#converter"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50 active:scale-[0.98] sm:w-auto"
          >
            Get Started Free
          </a>
          <a
            href="/privacy"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/30 bg-purple-800 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-900 active:scale-[0.98] sm:w-auto"
          >
            Privacy & Security
          </a>
        </div>
      </section>
    </div>
  );
}
