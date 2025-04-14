import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

const prisma = new PrismaClient()

export const getNextLeassons = async (c: Context) => {
    try {
        const id = Number(c.req.param('classroomid'));

        if (!id) return c.json({ message: "Error, this classroom does not existing" }, 404)

        const leassons = await prisma.lessons.findMany({
            where: {
                classroomId: id,
                inicio: {
                    gte: new Date()
                }
            },
            orderBy: {
                inicio: 'asc'
            },
        });

        if (!leassons || leassons.length === 0) return c.json({ message: "Error, this classroom does not existing or do not have leassons" }, 404)
        
        await createLog({
            title: "Próximas aulas obtidas",
            description: `Foram obtidas ${leassons.length} aulas`,
            table: 'lessons'
        })

        return c.json(leassons)
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}