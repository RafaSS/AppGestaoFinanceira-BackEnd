import { UserRepository } from "@/repositories/drizzle/userRepository";
import { LoginUseCase } from "@/services/login";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function LoginController(req: FastifyRequest, reply: FastifyReply) {
    const createUserBody = z.object({
        password: z.string(),
        email: z.string(),
    });

    const { email, password } = createUserBody.parse(req.body);
    
    const loginUseCase = new LoginUseCase(new UserRepository);
    try {
        const user = await loginUseCase.execute({ email, password });

        reply.code(201).send({ user });
    } catch (error) {
        if (error instanceof Error) {
            reply.code(400).send({ message: error.message });
        } else {
            reply.code(400).send({ message: 'An unknown error occurred' });
        }
    }
}