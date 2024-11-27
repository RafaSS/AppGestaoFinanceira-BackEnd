import { TransactionsRepository } from '@/repositories/transactionRepository'
import { Transaction } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface FindAllTransactionUseCaseRequest {
    user_id: string
}

export class FindAllTransactionsUseCase {
    constructor(private transactionsRepository: TransactionsRepository) { }

    async execute(request:FindAllTransactionUseCaseRequest): Promise<InferInsertModel<typeof Transaction>[]> {
        const transactions = await this.transactionsRepository.findByUserId(request.user_id)

        return transactions
    }
}