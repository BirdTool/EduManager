import { Hono } from 'hono'
import { registerController } from '../controllers/registerController';

const registerRoute = new Hono()

registerRoute.put('/:type', registerController)

export default registerRoute
