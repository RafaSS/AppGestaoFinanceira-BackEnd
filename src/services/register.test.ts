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
    }
    )
})