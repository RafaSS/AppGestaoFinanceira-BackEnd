import { User } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

export interface UsersRepository {
    create: (data: InferInsertModel<typeof User>) => Promise<InferInsertModel<typeof User>>
    findByEmail: (email: string) => Promise<InferInsertModel<typeof User> | null>
    findById: (id: string) => Promise<InferInsertModel<typeof User> | null>
    updateBalance: (id: string, balance: number) => Promise<InferInsertModel<typeof User>>
}