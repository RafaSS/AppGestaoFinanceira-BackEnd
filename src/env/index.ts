import 'dotenv/config';

import z from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
});

export const env = schema.safeParse(process.env);

if (!env.success) {
    console.error(env.error.errors);
    process.exit(1);
}