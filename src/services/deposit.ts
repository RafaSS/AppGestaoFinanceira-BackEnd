import { UsersRepository } from '@/repositories/userRepository'
import { User } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface DepositUseCaseRequest {
    user_id: string
    value: number
}

interface DepositUseCaseResponse {
    user: InferInsertModel<typeof User>
}
export class DepositUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        user_id,
        value,
    }: DepositUseCaseRequest): Promise<DepositUseCaseResponse> {
        const userFound = await this.usersRepository.findById(user_id);
        if (!userFound) { 
            throw new Error('User not found')
        }

        if (userFound.balance === undefined) {
            throw new Error('User balance is undefined');
        }

        const user = await this.usersRepository.updateBalance(user_id, Number(userFound.balance) + value);

        return { user }
    }
}
