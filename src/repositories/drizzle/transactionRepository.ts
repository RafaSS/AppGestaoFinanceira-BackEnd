

import { Transaction } from "@/db/schema"
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm"
import { TransactionsRepository } from '../transactionRepository'
import { db } from "@/db/index"

export class TransactionRepository implements TransactionsRepository {

    async findByUserId(userId: string): Promise<InferSelectModel<typeof Transaction>[]> {
        const transactions = await db.select().from(Transaction).where(eq(Transaction.fromUserId, userId)).execute()

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
        await db.insert(Transaction).values(transaction).execute()
        return transaction
    }

    async findById(id: string): Promise<InferSelectModel<typeof Transaction> | null> {
        const transaction = await db.select().from(Transaction).where(eq(Transaction.id, id)).execute()

        if (transaction.length === 0) {
            return null
        }
        return transaction[0]
    }

}