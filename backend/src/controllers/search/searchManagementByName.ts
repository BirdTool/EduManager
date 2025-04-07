import { Context } from 'hono'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchManagementByName = async (c: Context) => {
    try {
        const query = c.req.query('q');
        
        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        const management = await prisma.management.findMany({
            where: {
                nome: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        });

        if (management.length === 0) {
            return c.json({ message: 'Nenhum funcionário encontrado' }, 404);
        }

        return c.json({
            message: 'funcionários encontrados com sucesso',
            data: management,
            count: management.length
        }, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}