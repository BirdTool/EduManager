import { Hono } from 'hono'
import { loginController } from '../controllers/loginController';

const loginRoute = new Hono()

loginRoute.post('/:type', loginController)

export default loginRoute
