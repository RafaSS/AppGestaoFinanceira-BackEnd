import { FastifyInstance } from 'fastify'
import { CreateTransactionController } from './create.controller'
import { FindOneController } from './findOne.controller';
import { FindAllController } from './getAll.controller';


export async function userRoutes(app: FastifyInstance) {

    app.post('/users', CreateTransactionController)
    app.get('/users', FindAllController)
    app.get('/users/:id', FindOneController)

}
