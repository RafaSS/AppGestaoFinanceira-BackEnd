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
        const user = this.users.filter((user) => user.id === _id)

        if (user.length === 0) {
            return null
        }
        return user[0]
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

    async updateBalance(id: string, balance: number): Promise<InferInsertModel<typeof User>> {
        const user = this.users.find((user) => user.id === id)

        if (!user) {
            throw new Error('User not found')
        }

        user.balance = balance.toString()

        return user
    }
}
