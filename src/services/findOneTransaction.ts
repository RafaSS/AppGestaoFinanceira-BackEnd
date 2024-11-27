import { TransactionsRepository } from '@/repositories/transactionRepository'
import { Transaction } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface FindOneTransactionUseCaseRequest {
    id: string
}

export class FindOneTransactionUseCase {
    constructor(private transactionsRepository: TransactionsRepository) { }

    async execute(request: FindOneTransactionUseCaseRequest): Promise<InferInsertModel<typeof Transaction> | null> {
        const transaction = await this.transactionsRepository.findById(request.id)

        return transaction
    }
}