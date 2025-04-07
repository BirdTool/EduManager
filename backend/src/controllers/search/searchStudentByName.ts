import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchStudentByName = async (c: Context) => {
    try {
        const query = c.req.query('q');

        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        const students = await prisma.students.findMany({
            where: {
                nome: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        })

        if (students.length === 0) {
            return c.json({ message: 'Nenhum estudante encontrado' }, 404);
        }

        return c.json({
            message: 'Estudantes encontrados com sucesso',
            data: students,
            count: students.length
        }, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}