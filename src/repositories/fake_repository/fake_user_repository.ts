import { users } from '@/db/schema'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { UsersRepository } from '@/repositories/user_repository'
import { randomUUID } from 'crypto'

export class InmemoryUsersRepository implements UsersRepository {
    private users: InferSelectModel<typeof users>[] = []
    async findByEmail(_email: string): Promise<InferSelectModel<typeof users> | null> {
        const user = this.users.find((user) => user.email === _email)

        if (!user) {
            return null
        }
        return user
    }

    async findById(_id: string): Promise<InferSelectModel<typeof users> | null> {
        const user = this.users.find((user) => user.id === _id)

        if (!user) {
            return null
        }
        return user
    }

    async create(data: InferInsertModel<typeof users>): Promise<InferInsertModel<typeof users>> {
        const user = {
            id: randomUUID() as string,
            username: data.username,
            email: data.email,
            password_hash: data.password_hash,
        }

        this.users.push(user)
        return user
    }
}
