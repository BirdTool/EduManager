import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const searchLeassons = async (c: Context) => {
    try {
        const classroom = Number(c.req.param('classrroomid'));
        const query = c.req.query('q');

        if (classroom) {
            const leassons = await prisma.lessons.findMany({
                where: {
                    classroomId: classroom,
                    OR: [
                        { titulo: { contains: query, mode: 'insensitive' } },
                        { descricao: { contains: query, mode: 'insensitive' } },
                        { professor: {
                            nome: { contains: query, mode: 'insensitive' }
                        } }
                    ]
                }
            });

            if (leassons.length === 0) {
                return c.json({ message: 'Nenhuma aula encontrada' }, 404);
            }

            return c.json(leassons)
        } else {
            const leassons = await prisma.lessons.findMany({
                where: {
                    OR: [
                        { titulo: { contains: query, mode: 'insensitive' } },
                        { descricao: { contains: query, mode: 'insensitive' } },
                        { professor: {
                            nome: { contains: query, mode: 'insensitive' }
                        } }
                    ]
                }
            });

            if (leassons.length === 0) {
                return c.json({ message: 'Nenhuma aula encontrada' }, 404);
            }

            return c.json(leassons)
        }
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}