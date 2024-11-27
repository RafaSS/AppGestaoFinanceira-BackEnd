import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTransactionUseCase } from '@/services/createTransaction';
import { z } from 'zod';
import { TransactionRepository } from '@/repositories/drizzle/transactionRepository';


export async function CreateTransactionController(req: FastifyRequest, reply: FastifyReply) {
    const transactionBody = z.object({
        fromUserId: z.string(),
        toUserId: z.string(),
        amount: z.string(),
        transactionDate: z.string(),
        description: z.string()
    });

    const { fromUserId, toUserId, amount, transactionDate, description } = transactionBody.parse(req.body);

    const depositUseCase = new CreateTransactionUseCase(new TransactionRepository);
    try {
        const user = await depositUseCase.execute({ fromUserId, toUserId, amount, transactionDate, description });

        reply.code(201).send({ user });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(400).send({ message: error.message });
        } else {
            reply.code(400).send({ message: 'An unknown error occurred' });
        }
    }
}
