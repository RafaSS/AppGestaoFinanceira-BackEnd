import { describe, expect, beforeAll, afterAll, it } from 'vitest';
import request from 'supertest';
import { app } from '@/server';
import { db } from '@/db';
import { User } from '@/db/schema';

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
        await db.delete(User).execute()

    })

    afterAll(async () => {
        await app.close()
    })
    it('should be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            username: 'John Doe',
            email: '5UfZt@example.com',
            password: '123456',
        })
        console.log(response.body)
        expect(response.statusCode).toEqual(201)
    })
})