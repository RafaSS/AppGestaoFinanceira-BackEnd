import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm"
import { UsersRepository } from "../userRepository"
import { User } from "@/db/schema"
import { db } from "@/db/index"
import { randomUUID } from "crypto"


export class UserRepository implements UsersRepository {

    async findById(_id: string): Promise<InferSelectModel<typeof User>[] | null> {
        const user = await db.select().from(User).where(eq(User.id, _id)).execute()

        if (user.length === 0) {
            return null
        }
        return user
    }

    async findByEmail(email: string): Promise<InferSelectModel<typeof User> | null> {
        const user = await db.select().from(User).where(eq(User.email, email)).execute()

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

        await db.insert(User).values(user).execute()
        return user
    }
}