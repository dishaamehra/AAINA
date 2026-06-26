import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-svh bg-background text-slate-800 dark:bg-background-dark dark:text-slate-100">
      <header className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-primary">AAINA</span>
          <span className="text-sm text-neutral">Phase 1 — Project Initialized</span>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Reflect. Decide. Achieve.
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            AI-Powered Decision Intelligence
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-neutral">
            AAINA helps you make realistic, informed decisions before execution begins — not
            another to-do list, but a personal decision coach.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-success dark:bg-emerald-950/30">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Project foundation ready
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
