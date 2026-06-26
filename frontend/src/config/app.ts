export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5001',
  engineVersion: import.meta.env.VITE_ENGINE_VERSION ?? 'v1.0',
  promptVersion: import.meta.env.VITE_PROMPT_VERSION ?? 'v1.0',
} as const;
