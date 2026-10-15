import {z} from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(50),
  CORS_ORIGINS: z.string().default("http://localhost:5173"),
});

const result = envSchema.safeParse(process.env);

if(!result.success) {
  console.error("Invalid environment configurations");

  for( const error of result.error.errors ) {
    console.error(`- ${error.path.join(".")}: ${error.message}`);
  }
 
  throw new Error("Application startup failed due to : Invalid environment configurations.");
}

export const env = Object.freeze(result.data);