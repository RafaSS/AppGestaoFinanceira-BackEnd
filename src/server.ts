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
        });
    }

    if (error.validation) {
        return reply.status(400).send({
            message: 'Validation error.',
            details: error.validation,
        });
    }

    if (error.code === 'ERR_ASSERTION') {
        return reply.status(500).send({
            message: 'Internal server error.',
            details: 'Assertion error occurred.',
        });
    }

    if (env.NODE_ENV !== 'prod') {
        console.error(error);
    }

    return reply.status(500).send({
        message: 'Internal server error.',
        stack: error.stack,
    });
});

app.listen({
    port: Number(env.PORT)
}).then(() => {
    console.log(`Server listening on`, env.PORT);
}).catch(err => {
    console.error('Error starting server:', err);
    if (err.errno === -4091) {
        console.error('Port already in use. running server on another port');
        env.PORT = String(Number(env.PORT) + 1);
    }
    process.exit(1);
});