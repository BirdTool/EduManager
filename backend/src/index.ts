import { Hono } from 'hono'
import { cors } from 'hono/cors'
import * as jwt from 'jsonwebtoken';
import login from './routes/login';
import register from './routes/register';
import student from './routes/students';
import root from './routes/private/root';
import record from './routes/records';

type CustomBindings = {
  Bindings: {};
  Variables: {
    user: any;
  };
};

const app = new Hono<CustomBindings>()

const API_SECRET_KEY = process.env.TOKEN || 'default_secret_key';
const jwt_TOKEN = process.env.SECRET_KEY || 'default_secret_key'; 

app.use(
    cors({
      origin: 'http://localhost:5173', // Apenas seu site pode fazer requisições
      credentials: true,
    })
)

// Middleware para exigir o token principal
const apiTokenMiddleware = async (c: any, next: () => Promise<void>) => {
  const requestToken = c.req.header('x-api-key') // O token vem no header

  if (!requestToken || requestToken !== API_SECRET_KEY) {
    return c.json({ error: 'Acesso negado. Token inválido.' }, 403)
  }

  await next() // Se o token estiver certo, continua
}

app.use('*', apiTokenMiddleware)

app.use('/protected/*', async (c, next) => {
  const token = c.req.header('Cookie')?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  if (!token) return c.json({ success: false, message: 'Nenhum token fornecido' }, 401);

  try {
    const decoded = jwt.verify(token, jwt_TOKEN);
    c.set('user', decoded);
    await next();
  } catch (error) {
    return c.json({ success: false, message: 'Token inválido ou expirado' }, 401);
  }
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route('/login', login)
app.route('/register', register)

app.route('/api', student)
app.route('/api', record)

app.route('/root', root)

export default app
