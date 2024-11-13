import { RegisterUseCase } from '@/services/register'
import { InmemoryUsersRepository } from '@/repositories/fake_repository/fake_user_repository'

import { describe, expect, test } from 'vitest';

describe('RegisterUseCase', () => {
    test('should register a new user', async () => {
        const usersRepository = new InmemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const username = 'user'
        const email = 'jaquim@gmail.com'
        const password = '123456'

        const response = await registerUseCase.execute({ username, email, password })

        expect(response.user.username).toBe(username)
        expect(response.user.email).toBe(email)
    })
    
    test('should hash the password', async () => {
        const usersRepository = new InmemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const username = 'user'
        const email = 'pedrim@gmail'
        const password = '123'

        const response = await registerUseCase.execute({ username, email, password })

        expect(response.user.password_hash).not.toBe(password)
    })

    // test('should not register a user with the same email', async () => {
    //     const usersRepository = new InmemoryUsersRepository()
    //     const registerUseCase = new RegisterUseCase(usersRepository)

    //     const username = 'user'
    //     const email = 'pedrim@gmail'
    //     const password = '123'

    //     await registerUseCase.execute({ username, email, password })

    //     try {
    //         await registerUseCase.execute({ username, email, password })
    //     } catch (error) {
    //         expect(error.message).toBe('User already exists')
    //     }
    // })
})

