import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

const prisma = new PrismaClient()

export const postLeasson = async (c: Context) => {
    try {
        const classroom = Number(c.req.param('classroomid'));

        const { name, description, teacher, inicio, fim } = await c.req.json();

        const leasson = await prisma.lessons.create({
            data: {
                titulo: name,
                descricao: description,
                professorId: Number(teacher),
                classroomId: classroom,
                inicio: new Date(inicio),
                fim: new Date(fim)
            }
        })

        await createLog({
            title: "Aula criada",
            description: `Aula ${name} criada com sucesso`,
            userid: leasson.id,
            table: 'lessons'
        })

        return c.json(leasson, 201);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}