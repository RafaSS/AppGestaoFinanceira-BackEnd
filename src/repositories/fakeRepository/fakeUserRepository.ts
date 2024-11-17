import { User } from '@/db/schema'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { UsersRepository } from '@/repositories/userRepository'
import { randomUUID } from 'crypto'

export class InmemoryUsersRepository implements UsersRepository {
    private users: InferSelectModel<typeof User>[] = []
    async findByEmail(_email: string): Promise<InferSelectModel<typeof User> | null> {
        const user = this.users.find((user) => user.email === _email)

        if (!user) {
            return null
        }
        return user
    }

    async findById(_id: string): Promise<InferSelectModel<typeof User> | null> {
        const user = this.users.find((user) => user.id === _id)

        if (!user) {
            return null
        }
        return user
    }

    async create(data: InferInsertModel<typeof User>): Promise<InferInsertModel<typeof User>> {
        const user = {
            id: randomUUID() as string,
            username: data.username,
            email: data.email,
            password_hash: data.password_hash,
            balance: "0",
        }

        this.users.push(user)
        return user
    }
}