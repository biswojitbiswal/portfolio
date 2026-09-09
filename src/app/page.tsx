import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground sm:p-12">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-sm text-technical">
              Theme verification
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Portfolio theme is working
            </h1>
          </div>

          <ThemeToggle />
        </div>

        <p className="mt-4 text-muted-foreground">
          This page uses our semantic theme variables instead of hard-coded
          colours.
        </p>

        <ButtonPreview />
      </div>
    </main>
  );
}

function ButtonPreview() {
  return (
    <button className="mt-6 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground">
      Primary button
    </button>
  );
}