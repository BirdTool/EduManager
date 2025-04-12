import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getTeachers = async (c: Context) => {
    try {
        const id = c.req.param('id');

        if (id) {
            const idNumber = Number.parseInt(id);
            const teacher = await prisma.teachers.findUnique({
                where: {
                    id: idNumber
                }
            })

            if (!teacher) {
                return c.json({ error: 'Teacher not found' }, 404);
            }

            return c.json(teacher)
        } else {
            const teachers = await prisma.teachers.findMany();
    
            return c.json(teachers);
        }
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}