import { FastifyRequest, FastifyReply } from 'fastify';
import { DepositUseCase } from '@/services/deposit';
import { z } from 'zod';
import { UserRepository } from '@/repositories/drizzle/userRepository';


export async function DepositController(req: FastifyRequest, reply: FastifyReply) {
    const depositBody = z.object({
        user_id: z.string(),
        value: z.number()
    });

    const { user_id, value } = depositBody.parse(req.body);

    const depositUseCase = new DepositUseCase(new UserRepository);
    try {
        const user = await depositUseCase.execute({ user_id, value });

        reply.code(201).send({ user });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(400).send({ message: error.message });
        } else {
            reply.code(400).send({ message: 'An unknown error occurred' });
        }
    }
}
