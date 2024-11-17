import { Transaction } from "@/db/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"


export interface TransactionsRepository {
    findByUserId: (userId: string) => Promise<InferSelectModel<typeof Transaction>[]>
    create: (data: InferInsertModel<typeof Transaction>) => Promise<InferInsertModel<typeof Transaction>>
}