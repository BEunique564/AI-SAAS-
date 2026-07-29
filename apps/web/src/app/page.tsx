export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          AI Business OS
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Every Business Gets AI Employees.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
