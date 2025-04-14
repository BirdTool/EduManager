import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../utils/log';

const prisma = new PrismaClient()

export const getClassroom = async (c: Context) => {
    try {
        const classroomId = Number(c.req.param('id'));

        if (!classroomId) {
            const classroom = await prisma.classrooms.findMany();
            await createLog({
                title: "Sala de aula obtida",
                description: `Todas as salas de aula foram obtidas com sucesso`,
                table: 'classrooms'
            })
            return c.json(classroom);
        }

        const classroom = await prisma.classrooms.findUnique({
            where: {
                id: classroomId
            }
        });

        if (!classroom) {
            return c.text('Classroom not found', 404);
        }

        await createLog({
            title: "Sala de aula obtida",
            description: `A sala de aula ${classroom.nome} foi obtida com sucesso`,
            userid: classroomId,
            table: 'classrooms'
        })

        return c.json(classroom);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}