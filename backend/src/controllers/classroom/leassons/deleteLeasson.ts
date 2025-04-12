import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteLeasson = async (c: Context) => {
    try {
        const id = Number(c.req.param('leassonid'));

        const oldLeasson = await prisma.lessons.delete({
            where: { id }
        })

        return c.json(oldLeasson, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}