import { FastifyInstance } from 'fastify'
import { CreateTransactionController } from './create.controller'
import { FindOneController } from './findOne.controller';
import { FindAllController } from './getAll.controller';


export async function transactionRoutes(app: FastifyInstance) {

    app.post('/transaction', CreateTransactionController)
    app.get('/transactionAll/:user_id', FindAllController)
    app.get('/transaction/:id', FindOneController)

}
