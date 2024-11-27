import { describe, expect, beforeAll, afterAll, it } from 'vitest';
import request from 'supertest';
import { app } from '@/server';
import { db } from '@/db';
import { Transaction, User } from '@/db/schema';
import { eq } from 'drizzle-orm';

let user1: any;
let user2: any;

describe('Transaction Routes (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
        await db.delete(Transaction);
        await db.delete(User);

        user1 = await request(app.server).post('/users').send({
            username: 'User 1',
            password: 'password1',
            email: 'user1@example.com',
        });
        const userUpdate = await db.select().from(User).where(eq(User.id, user1.body.user.user.id)).execute();
        userUpdate[0].balance = '2000';
        await db.update(User).set(userUpdate[0]).where(eq(User.id, user1.body.user.user.id)).execute();

        user2 = await request(app.server).post('/users').send({
            username: 'User 2',
            password: 'password2',
            email: 'abner@gmail.com',
        });
        const userUpdate2 = await db.select().from(User).where(eq(User.id, user2.body.user.user.id)).execute();
        userUpdate2[0].balance = '1000';
        await db.update(User).set(userUpdate2[0]).where(eq(User.id, user2.body.user.user.id)).execute();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create a transaction and update user balances', async () => {
        const response = await request(app.server).post('/transaction').send({
            fromUserId: user1.body.user.user.id,
            toUserId: user2.body.user.user.id,
            amount: '100',
            transactionDate: new Date().toISOString(),
            description: 'Test transaction'
        });

        expect(response.statusCode).toEqual(201);
        const fromUserResponse = await db.select().from(User).where(eq(User.id, user1.body.user.user.id)).execute();
        expect(fromUserResponse[0].balance).toEqual('1900.00');

        const toUserResponse = await db.select().from(User).where(eq(User.id, user2.body.user.user.id)).execute();
        expect(toUserResponse[0].balance).toEqual('1100.00');
    });

    it('should get all transactions', async () => {
        await request(app.server).post('/transaction').send({
            fromUserId: user1.body.user.user.id,
            toUserId: user2.body.user.user.id,
            amount: '100',
            transactionDate: new Date().toISOString(),
            description: 'Test transaction'
        });

        const response = await request(app.server).get(`/transactionAll/${user1.body.user.user.id}`);
        expect(response.statusCode).toEqual(201);
        expect(response.body.user).toBeInstanceOf(Array);
    });

    it('should get a transaction by id', async () => {
        const createResponse = await request(app.server).post('/transaction').send({
            fromUserId: user1.body.user.user.id,
            toUserId: user2.body.user.user.id,
            amount: '100',
            transactionDate: new Date().toISOString(),
            description: 'Test transaction'
        });

        const transactionId = createResponse.body.user.id;
        const response = await request(app.server).get(`/transaction/${transactionId}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.user).toHaveProperty('id', transactionId);
    });
});
