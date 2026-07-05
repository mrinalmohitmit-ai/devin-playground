export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {year} Devin Notes. Built with Next.js and markdown.</p>
        <p className="max-w-xl">Thoughtful essays, practical snippets, and clean typography.</p>
      </div>
    </footer>
  );
}
