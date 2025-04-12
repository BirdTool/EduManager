import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

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

        return c.json(leasson, 201);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}