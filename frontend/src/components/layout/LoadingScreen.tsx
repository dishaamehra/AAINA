import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading AAINA...' }: LoadingScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--aaina-bg)] px-6 text-[var(--aaina-ink)]">
      <section className="text-center" aria-live="polite" aria-busy="true">
        <motion.div
          className="mx-auto mb-6 h-14 w-14 rounded-full border-4 border-[var(--aaina-lavender)] border-t-[var(--aaina-indigo)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-sm font-medium tracking-wide text-[var(--aaina-muted)]">{message}</p>
      </section>
    </main>
  );
}
