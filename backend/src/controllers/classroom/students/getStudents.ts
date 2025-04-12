import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getStudents = async (c: Context) => {
    try {
        const classroom = Number(c.req.param('id'));

        const students = await prisma.students.findMany({
            where: {
                classroomId: classroom
            }
        });

        return c.json(students);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}