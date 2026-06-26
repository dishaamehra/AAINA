import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  isLoading = false,
  variant = 'primary',
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'bg-[var(--aaina-indigo)] text-white shadow-lg shadow-indigo-950/20 hover:-translate-y-0.5 hover:bg-indigo-950'
      : 'border border-[var(--aaina-border)] bg-white/70 text-[var(--aaina-ink)] hover:bg-white';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  );
}
