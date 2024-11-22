import { compare, hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/userRepository'
import { User } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface LoginUseCaseRequest {
    email: string
    password: string
}

interface LoginUseCaseResponse {
    user: InferInsertModel<typeof User>
}
export class LoginUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email,
        password,
    }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);
        
        if (!user) {            
            throw new Error('User or password incorrect.')
        }

        const passwordExists = await compare(password, user.password_hash);
        
        if(!passwordExists) {
            throw new Error('User or password incorrect.')
        }

        return { user }
    }
}
