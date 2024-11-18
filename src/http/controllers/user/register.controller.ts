import { FastifyRequest, FastifyReply } from 'fastify';
import { RegisterUseCase } from '@/services/register';
import { z } from 'zod';
import { UserRepository } from '@/repositories/drizzle/userRepository';


export async function RegisterController(req: FastifyRequest, reply: FastifyReply) {
    const createUserBody = z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
    });

    const { username, email, password } = createUserBody.parse(req.body);
    
    const registerUseCase = new RegisterUseCase(new UserRepository);
    try {
        const user = await registerUseCase.execute({ username, email, password });
        

        reply.code(201).send({ user });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(400).send({ message: error.message });
        } else {
            reply.code(400).send({ message: 'An unknown error occurred' });
        }
    }
}
