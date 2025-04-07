import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchAll = async (c: Context) => {
    try {
        const query = c.req.query('q');

        if (!query) {
            return c.json({ message: 'É necessário fornecer um termo de busca' }, 400);
        }

        // Buscar estudantes
        const students = await prisma.students.findMany({
            where: {
                nome: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        });

        // Buscar professores
        const teachers = await prisma.teachers.findMany({
            where: {
                nome: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        });

        // Buscar gestão
        const management = await prisma.management.findMany({
            where: {
                nome: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        });

        if (students.length === 0 && teachers.length === 0 && management.length === 0) {
            return c.json({ message: 'Nenhum resultado encontrado' }, 404);
        }

        return c.json({
            message: 'Busca realizada com sucesso',
            allData: [...students, ...teachers, ...management],
            data: {
                students,
                teachers,
                management
            },
            counts: {
                students: students.length,
                teachers: teachers.length,
                management: management.length,
                total: students.length + teachers.length + management.length
            }
        }, 200);

    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}
