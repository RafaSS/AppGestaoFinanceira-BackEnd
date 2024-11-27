import { DepositUseCase } from '@/services/deposit'
import { InmemoryUsersRepository } from '@/repositories/fakeRepository/fakeUserRepository'

import { describe, expect, test } from 'vitest';

describe('DepositUseCase', () => {
    test('should be able to deposit', async () => {
        const userRepository = new InmemoryUsersRepository()
        const depositUseCase = new DepositUseCase(userRepository)

        const user = await userRepository.create({
            email: 'carlim@gmail.com',
            username: 'carlim',
            password_hash: '123456',
            balance: '10'
        })


        await depositUseCase.execute({
            user_id: user.id as string,
            value: 10
        })

        const response = await depositUseCase.execute({
            user_id: user.id as string,
            value: 10
        })
        expect(response.user.balance).toBe('30')

    })
})
