import { Context } from "hono";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchRecordsByStudentName = async (c: Context) => {
    try {
        const query = c.req.query('q');

        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        // Busca registros onde o nome do aluno contém o termo buscado
        const records = await prisma.records.findMany({
            where: {
                student: {
                    nome: {
                        contains: query,
                        mode: 'insensitive'
                    }
                }
            },
            include: {
                student: true
            }
        });

        if (records.length === 0) {
            return c.json({ message: 'Nenhum registro encontrado' }, 404);
        }

        return c.json({
            message: 'Registros encontrados com sucesso',
            data: records,
            count: records.length
        }, 200);
    } catch (error) {
        console.error('Erro ao buscar registros por aluno:', error);
        return c.json({ message: 'Erro ao buscar registros por aluno' }, 500);
    }
};
