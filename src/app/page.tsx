import { ConverterCard } from "@/components/converter-card";

const benefits = [
  {
    icon: "S",
    title: "Secure & Private",
    description: "Temporary jobs and explicit cleanup after download.",
  },
  {
    icon: "F",
    title: "Fast Conversion",
    description: "A focused flow built for quick file handling.",
  },
  {
    icon: "N",
    title: "No Installation",
    description: "Convert in your browser with server-side validation.",
  },
];

const steps = [
  {
    title: "Upload File",
    description: "Choose a supported file from your device.",
  },
  {
    title: "Choose Format",
    description: "Select the output format available for that file.",
  },
  {
    title: "Download File",
    description: "Download the result, then the server copy is cleared.",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--background)]">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:px-8 lg:py-20">
        <div className="min-w-0">
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-[3.5rem] dark:text-white">
            Convert{" "}
            <span className="text-[var(--brand)]">Convault</span> Files
            Easily & Instantly
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-zinc-300">
            Upload your file and convert it to supported formats in just a few
            clicks. Convault keeps the workflow simple, fast, and privacy-first.
          </p>

          <div id="features" className="mt-10 grid max-w-2xl scroll-mt-28 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex min-w-0 gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-[var(--brand-soft)] text-sm font-bold text-[var(--brand)] dark:border-purple-500/30">
                  {benefit.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-[var(--brand)]">
                    {benefit.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="converter" className="min-w-0 scroll-mt-28">
          <div className="rounded-[1.5rem] border border-dashed border-purple-400 bg-white p-3 shadow-[0_18px_50px_rgb(88_28_135/0.08)] sm:p-5 dark:border-purple-500/50 dark:bg-zinc-900">
            <div className="mx-auto max-w-2xl">
              <ConverterCard />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 border-y border-[var(--border-subtle)] bg-white/80 px-6 py-12 sm:px-10 dark:bg-zinc-950/70">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
            How It Works
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300">
            Convert your files in 3 simple steps
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-purple-200 bg-[var(--brand-soft)] text-2xl font-bold text-[var(--brand)] dark:border-purple-500/30">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-48 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
