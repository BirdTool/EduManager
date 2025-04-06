import { Context } from "hono";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchRecordsByResponsibleName = async (c: Context) => {
    try {
        const query = c.req.query('q');

        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        // Busca registros onde o nome do responsável contém o termo de busca
        // Usando a sintaxe específica para PostgreSQL com Prisma
        const records = await prisma.records.findMany({
            where: {
                responsavel: {
                    contains: query,
                    mode: 'insensitive' // Específico para PostgreSQL - case insensitive
                }
            },
            include: {
                student: true // Inclui informações do estudante relacionado, se necessário
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
        console.error('Erro ao buscar registros:', error);
        return c.json({ message: 'Erro ao buscar registros' }, 500);
    }
};
