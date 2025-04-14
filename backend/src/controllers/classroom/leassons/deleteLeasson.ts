import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

const prisma = new PrismaClient()

export const deleteLeasson = async (c: Context) => {
    try {
        const id = Number(c.req.param('leassonid'));

        const oldLeasson = await prisma.lessons.delete({
            where: { id }
        })

        await createLog({
            title: "Aula deletada",
            description: `Aula ${oldLeasson.titulo} foi deletada`,
            userid: id,
            table: 'lessons',
        })

        return c.json(oldLeasson, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}