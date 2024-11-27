import { TransactionsRepository } from '@/repositories/transactionRepository'
import { Transaction } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface CreateTransactionUseCaseRequest {
    fromUserId: string
    toUserId: string
    amount: string
    transactionDate: string
    description?: string
}

export class CreateTransactionUseCase {
    constructor(private transactionsRepository: TransactionsRepository) { }

    async execute(request: CreateTransactionUseCaseRequest): Promise<InferInsertModel<typeof Transaction>> {
        const transaction = await this.transactionsRepository.create(request)

        return transaction
    }
}



