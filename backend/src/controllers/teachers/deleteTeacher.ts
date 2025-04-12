import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteTeacher = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        if (!id || isNaN(id)) {
            return c.json({ error: 'Invalid ID' }, 400);
        }

        const teacher = await prisma.teachers.findUnique({
            where: { id }
        });

        if (!teacher) {
            return c.json({ error: 'Teacher not found' }, 404);
        }

        const oldTeacher = await prisma.teachers.delete({
            where: { id }
        });

        return c.json({ message: 'Teacher deleted successfully', success: true, data: oldTeacher }, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}