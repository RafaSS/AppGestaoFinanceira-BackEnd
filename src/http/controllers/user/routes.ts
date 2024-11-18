import { FastifyInstance } from 'fastify'
import { RegisterController } from './register.controller'


// import { registerController } from './register.controller'

export async function userRoutes(app: FastifyInstance) {

   app.post('/users', RegisterController)

}
