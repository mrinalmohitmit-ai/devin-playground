export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">About</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-card-foreground sm:text-5xl">A calm corner for thoughtful writing.</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-muted-foreground">
          <p>
            Devin Notes is a simple sample blog built to feel warm, modern, and easy to read. It keeps the focus on the
            words with generous spacing, restrained color, and typography that works in both light and dark mode.
          </p>
          <p>
            The site is powered by Next.js App Router, TypeScript, Tailwind CSS, and markdown files stored directly in the
            repository. No database, no CMS, just static content that builds cleanly and loads fast.
          </p>
          <p>
            It is designed as a flexible starting point for essays, changelogs, tutorials, or a personal writing archive.
          </p>
        </div>
      </div>
    </div>
  );
}
