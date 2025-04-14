import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../utils/log'

const prisma = new PrismaClient()

type Bindings = {
  user: { id: string; name: string; role: string }
}

const meRoute = new Hono<{ Bindings: Bindings; Variables: { user: Bindings['user'] } }>()

meRoute.get('/me', async (c) => {
  const user = c.get('user');

  if (!user || user.role !== 'student') {
    await createLog({
      title: "Acesso negado",
      description: `Usuário "${user.name}" tentou acessar o perfil, mas não tem permissão`,
      userid: Number(user.id),
      table: 'students',
      level: 'warn'
    })
    return c.json({ success: false, message: 'Acesso negado' }, 403);
  }

  const data = await prisma.students.findUnique({
    where: {
        id: Number(user.id)
    }
  })

  if (!data) {
    await createLog({
      title: "Usuário não encontrado",
      description: `Usuário "${user.name}" tentou acessar o perfil, mas não foi encontrado no banco de dados`,
      userid: Number(user.id),
      table: 'students',
      level: 'error'
    })
    return c.json({ success: false, message: 'Usuário não encontrado' }, 404);
  }

  await createLog({
    title: 'Acesso ao perfil',
    description: `Usuário ${user.name} acessou o perfil`,
    userid: Number(user.id),
    table: 'students'
  })

  return c.json({ success: true, data });
});

export default meRoute
