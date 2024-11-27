import fastify from "fastify";
import { userRoutes } from "./http/controllers/user/routes";
import { ZodError } from "zod";
import { env } from "process";
import { transactionRoutes } from "./http/controllers/transaction/routes";

export const app = fastify();
app.register(userRoutes);
app.register(transactionRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: error.format(),
        })
    }
    if (env.NODE_ENV !== 'prod') {
        console.error(error)
    }
    return reply.status(500).send({
        message: 'Internal server error.',
        stack: error.stack,
    })
})

app.listen({
    port: 3000,

}).then(() => {
    console.log(`Server listening on http://localhost:3000`);
})