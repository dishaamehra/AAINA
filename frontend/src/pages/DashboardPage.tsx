import { Button } from '../components/ui/Button.js';
import { useAuth } from '../hooks/useAuth.js';

export function DashboardPage() {
  const { profile, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[var(--aaina-bg)] px-6 py-8 text-[var(--aaina-ink)]">
      <section className="mx-auto max-w-5xl">
        <nav className="mb-10 flex flex-col gap-4 rounded-3xl border border-[var(--aaina-border)] bg-white/80 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--aaina-indigo)]">
              AAINA
            </p>
            <p className="text-sm text-[var(--aaina-muted)]">Authentication phase dashboard</p>
          </div>
          <Button variant="secondary" onClick={logout} type="button">
            Logout
          </Button>
        </nav>

        <div className="rounded-[2rem] border border-[var(--aaina-border)] bg-white/85 p-8 shadow-xl shadow-indigo-950/5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--aaina-emerald)]">
                Session verified
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
                Welcome, {profile?.name ?? 'AAINA user'}.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--aaina-muted)]">
                Your Firebase session is active, your backend token verification passed, and your
                Firestore user document has been synchronized through Cloud Functions.
              </p>
            </div>
            {profile?.photoURL ? (
              <img
                src={profile.photoURL}
                alt="User profile"
                className="h-20 w-20 rounded-3xl object-cover shadow-lg"
              />
            ) : null}
          </div>

          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[var(--aaina-surface)] p-5">
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--aaina-muted)]">
                Role
              </dt>
              <dd className="mt-2 text-lg font-semibold">{profile?.role}</dd>
            </div>
            <div className="rounded-3xl bg-[var(--aaina-surface)] p-5">
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--aaina-muted)]">
                Email
              </dt>
              <dd className="mt-2 break-all text-lg font-semibold">{profile?.email}</dd>
            </div>
            <div className="rounded-3xl bg-[var(--aaina-surface)] p-5">
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--aaina-muted)]">
                Timezone
              </dt>
              <dd className="mt-2 text-lg font-semibold">{profile?.timezone}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
