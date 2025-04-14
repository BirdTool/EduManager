import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../utils/log';

const prisma = new PrismaClient()

export const getTeachers = async (c: Context) => {
    try {
        const id = c.req.param('id');

        if (id) {
            const idNumber = Number.parseInt(id);
            const teacher = await prisma.teachers.findUnique({
                where: {
                    id: idNumber
                }
            })

            if (!teacher) {
                await createLog({
                    title: 'Professor não encontrado',
                    description: `O professor com o ID ${id} não foi encontrado ao tentar-se obter os dados do professor.`,
                    level: 'error',
                    table: 'teacher'
                })
                return c.json({ error: 'Teacher not found' }, 404);
            }
            
            await createLog({
                title: 'Professor encontrado',
                description: `O professor com o ID ${id} foi encontrado ao tentar-se obter os dados do professor.`,
                userid: teacher.id,
                level: 'info',
                table: 'teacher'
            })
            return c.json(teacher)
        } else {
            const teachers = await prisma.teachers.findMany();
    
            await createLog({
                title: 'Professores encontrados',
                description: `Foram encontrados ${teachers.length} professores ao tentar-se obter os dados dos professores.`,
                level: 'info',
                table: 'teacher'
            })
            return c.json(teachers);
        }
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}