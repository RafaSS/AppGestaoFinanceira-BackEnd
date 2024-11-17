import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/userRepository'
import { User } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface RegisterUseCaseRequest {
    username: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: InferInsertModel<typeof User>
}
export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        username,
        email,
        password,
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('User already exists')
        }

        const user = await this.usersRepository.create({
            username,
            email,
            password_hash,
        })

        return { user }
    }
}
