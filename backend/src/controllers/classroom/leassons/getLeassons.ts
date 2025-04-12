import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getLeassons = async (c: Context) => {
    try {
        const leassonid = Number(c.req.param('leassonid'));
        const classroomid = Number(c.req.param('classroomid'));

        if (leassonid) {
            const leasson = await prisma.lessons.findUnique({
                where: {
                    id: leassonid
                }
            })

            if (!leasson) {
                return c.text('Leasson not found', 404);
            }

            return c.json(leasson);
        } else if (classroomid) {
            const leassons = await prisma.lessons.findMany({
                where: {
                    classroomId: classroomid
                }
            })
        } else {
            const leassons = await prisma.lessons.findMany();

            return c.json(leassons);
        }
        
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}