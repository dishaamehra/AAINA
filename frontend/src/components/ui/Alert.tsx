interface AlertProps {
  message: string;
}

export function Alert({ message }: AlertProps) {
  return (
    <div
      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
      role="alert"
    >
      {message}
    </div>
  );
}
