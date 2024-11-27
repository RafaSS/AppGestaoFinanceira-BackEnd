

import { Transaction, User } from "@/db/schema"
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm"
import { UserRepository } from "./userRepository"
import { TransactionsRepository } from '../transactionRepository'
import { db } from "@/db/index"
import { randomUUID } from "crypto"

export class TransactionRepository implements TransactionsRepository {

    async findByUserId(userId: string): Promise<InferSelectModel<typeof Transaction>[]> {
        const transactions = await db.select().from(Transaction).where(eq(Transaction.fromUserId, userId)).execute()

        return transactions
    }
    async create(data: InferInsertModel<typeof Transaction>): Promise<InferInsertModel<typeof Transaction>> {
        const fromUser = await db.select().from(User).where(eq(User.id, data.fromUserId)).execute()
        if (fromUser.length === 0) {
            throw new Error('From user does not exist')
        }

        const toUser = await db.select().from(User).where(eq(User.id, data.toUserId)).execute()
        if (toUser.length === 0) {
            throw new Error('To user does not exist')
        }

        const transaction = {
            id: randomUUID() as string,
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            amount: data.amount,
            transactionDate: data.transactionDate,
            description: data.description ?? null
        }
        await db.insert(Transaction).values(transaction).execute()

        fromUser[0].balance = String(Number(fromUser[0].balance) - Number(data.amount))
        toUser[0].balance = String(Number(toUser[0].balance) + Number(data.amount))


        await db.update(User).set(fromUser[0]).where(eq(User.id, data.fromUserId)).execute()
        await db.update(User).set(toUser[0]).where(eq(User.id, data.toUserId)).execute()

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