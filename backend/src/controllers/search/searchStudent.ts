import { Context } from 'hono'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchStudentByAllInfos = async (c: Context) => {
    try {
        const query = c.req.query('q');

        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        const students = await prisma.students.findMany({
            where: {
                OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { matricula: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    { genero: { contains: query, mode: 'insensitive' } },
                    { telefone: { contains: query, mode: 'insensitive' } },
                    { responsavel1: { contains: query, mode: 'insensitive' } },
                    { responsavel2: { contains: query, mode: 'insensitive' } },
                ]
            }
        });

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
