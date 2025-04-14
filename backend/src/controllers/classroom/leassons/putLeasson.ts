import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

const prisma = new PrismaClient()

export const putLeasson = async (c: Context) => {
    try {
        const id = Number(c.req.param('lessonid'));

        const { name, description, teacher, inicio, fim } = await c.req.json();

        const oldLeasson = await prisma.lessons.findUnique({
            where: { id }
        });

        if (!oldLeasson) {
            return c.json({ error: 'Leasson not found' }, 404);
        }

        const leasson = await prisma.lessons.update({
            where: { id },
            data: {
                titulo: name || oldLeasson.titulo,
                descricao: description || oldLeasson.descricao,
                professorId: Number(teacher) || oldLeasson.professorId,
                inicio: new Date(inicio) || oldLeasson.inicio,
                fim: new Date(fim) || oldLeasson.fim
            }
        });

        await createLog({
            title: "Aula atualizada",
            description: `Aula ${leasson.titulo} foi atualizada`,
            userid: leasson.id,
            table: 'lessons'
        })

        return c.json(leasson, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}