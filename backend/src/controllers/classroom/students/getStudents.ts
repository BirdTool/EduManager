import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

const prisma = new PrismaClient()

export const getStudents = async (c: Context) => {
    try {
        const classroom = Number(c.req.param('id'));

        const students = await prisma.students.findMany({
            where: {
                classroomId: classroom
            }
        });

        await createLog({
            title: "Alunos de uma classe foram obtidos",
            description: `Alunos da classe: ${classroom} foram obtidos`,
            userid: classroom,
            table: "classroom"
        })

        return c.json(students);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}