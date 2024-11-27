import { FastifyInstance } from 'fastify'
import { RegisterController } from './register.controller'
import { LoginController } from './login.controller';
import { DepositController } from './deposit.controller';


export async function userRoutes(app: FastifyInstance) {

   app.post('/users', RegisterController)
   app.post('/login', LoginController)
   app.post('/deposit', DepositController)

}
