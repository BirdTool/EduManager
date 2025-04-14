import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

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
                await createLog({
                    title: "Aula não encontrada",
                    description: `Aula ${leassonid} não encontrada`,
                    table: 'lessons'
                })
                return c.text('Leasson not found', 404);
            }

            await createLog({
                title: "Aula obtida",
                description: `Aula ${leasson.titulo} obtida com sucesso`,
                userid: leassonid,
                table: 'lessons'
            })

            return c.json(leasson);
        } else if (classroomid) {
            const leassons = await prisma.lessons.findMany({
                where: {
                    classroomId: classroomid
                }
            })

            if (!leassons || leassons.length === 0) {
                await createLog({
                    title: "Aulas não encontradas",
                    description: `Nenhuma aula encontrada para a turma ${classroomid}`,
                    table: 'lessons'
                })
                return c.text('Leassons not found', 404);
            }

            await createLog({
                title: "Aulas obtidas",
                description: `Aulas obtidas com sucesso para a turma ${classroomid}`,
                userid: classroomid,
                table: 'lessons'
            })

            return c.json(leassons)
        } else {
            const leassons = await prisma.lessons.findMany();

            if (!leassons || leassons.length === 0) {
                await createLog({
                    title: "Aulas não encontradas",
                    description: `Nenhuma aula encontrada`,
                    table: 'lessons'
                })
                return c.text('Leassons not found', 404);
            }

            await createLog({
                title: "Aulas obtidas",
                description: `Aulas obtidas com sucesso`,
                table: 'lessons'
            })

            return c.json(leassons);
        }
        
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}