import * as z from 'zod';

export const EnvSchema = z.object({
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(['dev', 'prod', 'test']),
    DEBUG: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

export let env: Env;

try {
    env = EnvSchema.parse(process.env); // => throw Error
} catch (error) {
    console.error((error as z.ZodError).message);
    process.exit(1);
}

// const rs = EnvSchema.safeParse(x);
// if (rs !== undefined) {
//     console.log(rs);
// }
