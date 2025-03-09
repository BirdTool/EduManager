import { Hono } from 'hono'
import { cors } from 'hono/cors'
import login from './routes/login';
import register from './routes/register';

const app = new Hono()

const API_SECRET_KEY = process.env.TOKEN || 'default_secret_key'

// ✅ Middleware para exigir o token principal
const apiTokenMiddleware = async (c: any, next: () => Promise<void>) => {
  const requestToken = c.req.header('x-api-key') // O token vem no header

  if (!requestToken || requestToken !== API_SECRET_KEY) {
    return c.json({ error: 'Acesso negado. Token inválido.' }, 403)
  }

  await next() // Se o token estiver certo, continua
}

app.use('*', apiTokenMiddleware)

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
app.route('/register', register)

export default app
