import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getClassroom = async (c: Context) => {
    try {
        const classroomId = Number(c.req.param('id'));

        if (!classroomId) {
            const classroom = await prisma.classrooms.findMany();
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

        return c.json(classroom);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}