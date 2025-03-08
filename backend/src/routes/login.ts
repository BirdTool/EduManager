import { Hono } from 'hono'
import { loginController } from '../controllers/loginController';

const loginRoute = new Hono()

loginRoute.put('/:type', loginController)

export default loginRoute
