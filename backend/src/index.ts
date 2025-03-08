import { Hono } from 'hono'
import { cors } from 'hono/cors'
import login from './routes/login';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(
    cors({
      origin: 'http://localhost:5173', // Apenas seu site pode fazer requisições
      credentials: true, // Se precisar de cookies para autenticação
    })
)

app.route('/login', login)

export default app
