import { z } from 'zod';

export const syncAuthenticatedUserRequestSchema = z
  .object({
    timezone: z.string().trim().min(1).max(80).optional(),
  })
  .strict();

export type SyncAuthenticatedUserRequestInput = z.infer<typeof syncAuthenticatedUserRequestSchema>;
