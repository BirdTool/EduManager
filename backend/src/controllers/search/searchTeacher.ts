import { Context } from 'hono'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchTeacherByAllInfos = async (c: Context) => {
    try {
        const query = c.req.query('q');
        
        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        const teachers = await prisma.teachers.findMany({
            where: {
                OR: [
                    { nome: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    { genero: { contains: query, mode: 'insensitive' } },
                    { telefone: { contains: query, mode: 'insensitive' } },
                ]
            }
        });

        if (teachers.length === 0) {
            return c.json({ message: 'Nenhum professor encontrado' }, 404);
        }

        return c.json({
            message: 'Professores encontrados com sucesso',
            data: teachers,
            count: teachers.length
        }, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}