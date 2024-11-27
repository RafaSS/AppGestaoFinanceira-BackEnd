import { FastifyInstance } from 'fastify'
import { CreateTransactionController } from './create.controller'
// import { FindOneController } from './findOne.controller';
// import { GetAllController } from './getAll.controller';


export async function userRoutes(app: FastifyInstance) {

    app.post('/users', CreateTransactionController)
    // app.get('/users', GetAllController)
    // app.get('/users/:id', FindOneController)

}
