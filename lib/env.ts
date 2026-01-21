import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
})

export function validateEnv(): void {
  try {
    EnvSchema.parse(process.env)
  } catch (e) {
    // Throw with clear message to fail fast during build if missing
    const details = (e as any).errors?.map((x: any) => `${x.path.join('.')} - ${x.message}`).join('\n')
    throw new Error(`Invalid environment variables:\n${details}`)
  }
}

export type Env = z.infer<typeof EnvSchema>
