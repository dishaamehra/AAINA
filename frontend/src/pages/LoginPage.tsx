import { useState } from 'react';
import { motion } from 'framer-motion';
import { Alert } from '../components/ui/Alert.js';
import { Button } from '../components/ui/Button.js';
import { useAuth } from '../hooks/useAuth.js';

const productPrinciples = [
  'Reality-first planning before execution',
  'Calm guidance without guilt',
  'Secure Google identity for every decision flow',
];

export function LoginPage() {
  const { signInWithGoogle, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsSubmitting(true);
    clearError();

    try {
      await signInWithGoogle();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.16),_transparent_34%),var(--aaina-bg)] px-6 py-8 text-[var(--aaina-ink)]">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="inline-flex rounded-full border border-[var(--aaina-border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--aaina-indigo)] shadow-sm backdrop-blur">
            AAINA - Reflect. Decide. Achieve.
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-[-0.04em] md:text-7xl">
              Make realistic plans before the day begins.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--aaina-muted)]">
              Sign in securely with Google to initialize your private AAINA profile. Your future
              decisions, Focus DNA, and recovery insights will stay tied to your verified identity.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3">
            {productPrinciples.map((principle) => (
              <li
                key={principle}
                className="rounded-3xl border border-[var(--aaina-border)] bg-white/65 p-4 text-sm font-medium text-[var(--aaina-muted)] shadow-sm backdrop-blur"
              >
                {principle}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="rounded-[2rem] border border-[var(--aaina-border)] bg-white/80 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--aaina-emerald)]">
              Secure access
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">Continue to AAINA</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--aaina-muted)]">
              Authentication is handled through Firebase Google Sign-In. AAINA then verifies your
              token in Cloud Functions before creating your user profile.
            </p>
          </div>

          {error ? (
            <div className="mb-5">
              <Alert message={error} />
            </div>
          ) : null}

          <Button
            className="w-full gap-3"
            isLoading={isSubmitting}
            onClick={handleGoogleSignIn}
            type="button"
            aria-label="Continue with Google"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--aaina-indigo)]">
              G
            </span>
            Continue with Google
          </Button>

          <p className="mt-5 text-center text-xs leading-5 text-[var(--aaina-muted)]">
            By continuing, your Firebase ID token is verified on the backend before any profile data
            is created or returned.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
