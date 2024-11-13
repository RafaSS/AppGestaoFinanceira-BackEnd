import { users } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

export interface UsersRepository {
    create: (data: InferInsertModel<typeof users>) => Promise<any>
    findByEmail: (email: string) => Promise<any>
}