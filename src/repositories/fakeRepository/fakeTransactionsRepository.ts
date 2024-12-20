

import { Transaction } from "@/db/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { TransactionsRepository } from '@/repositories/transactionRepository'

export class InmemoryTransactionsRepository implements TransactionsRepository {
    private transactions: InferSelectModel<typeof Transaction>[] = []

    async findByUserId(userId: string): Promise<InferSelectModel<typeof Transaction>[]> {
        const transactions = this.transactions.filter((transaction) => transaction.fromUserId === userId)

        return transactions
    }

    async create(data: InferInsertModel<typeof Transaction>): Promise<InferInsertModel<typeof Transaction>> {
        const transaction = {
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            amount: data.amount,
            transactionDate: data.transactionDate,
            description: data.description ?? null
        }
        this.transactions.push(transaction as InferSelectModel<typeof Transaction>)
        return transaction
    }

    async findById(id: string): Promise<InferSelectModel<typeof Transaction> | null> {
        const transaction = this.transactions.find((transaction) => transaction.id === id)

        if (!transaction) {
            return null
        }
        return transaction
    }
}

