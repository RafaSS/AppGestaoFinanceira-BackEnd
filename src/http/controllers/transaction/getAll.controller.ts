import { FastifyRequest, FastifyReply } from 'fastify';
import { FindAllTransactionsUseCase } from '@/services/findAllTransactions';
import { z } from 'zod';
import { TransactionRepository } from '@/repositories/drizzle/transactionRepository';


export async function FindAllController(req: FastifyRequest, reply: FastifyReply) {
    const transactionBody = z.object({
        user_id: z.string(),
    });

    const { user_id } = transactionBody.parse(req.body);

    const depositUseCase = new FindAllTransactionsUseCase(new TransactionRepository);
    try {
        const user = await depositUseCase.execute({ user_id });

        reply.code(201).send({ user });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(400).send({ message: error.message });
        } else {
            reply.code(400).send({ message: 'An unknown error occurred' });
        }
    }
}