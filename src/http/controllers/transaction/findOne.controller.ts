import { FastifyRequest, FastifyReply } from 'fastify';
import { FindOneTransactionUseCase } from '@/services/findOneTransaction';
import { z } from 'zod';
import { TransactionRepository } from '@/repositories/drizzle/transactionRepository';


export async function FindOneController(req: FastifyRequest, reply: FastifyReply) {
    const transactionBody = z.object({
        id: z.string(),
    });

    const { id } = transactionBody.parse(req.body);

    const depositUseCase = new FindOneTransactionUseCase(new TransactionRepository);
    try {
        const user = await depositUseCase.execute({ id });

        reply.code(201).send({ user });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(400).send({ message: error.message });
        } else {
            reply.code(400).send({ message: 'An unknown error occurred' });
        }
    }
}