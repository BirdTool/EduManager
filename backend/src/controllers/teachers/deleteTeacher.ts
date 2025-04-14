import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../utils/log';

const prisma = new PrismaClient()

export const deleteTeacher = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        if (!id || isNaN(id)) {
            return c.json({ error: 'Invalid ID' }, 400);
        }

        const teacher = await prisma.teachers.findUnique({
            where: { id }
        });

        if (!teacher) {
            await createLog({
                title: 'Professor não encontrado ao tentar deletar',
                description: `Foi tentado deletar o professor com ID ${id} mas o mesmo não foi encontrado`,
                table: 'teachers',
                level: 'error'
            });
            return c.json({ error: 'Teacher not found' }, 404);
        }

        const oldTeacher = await prisma.teachers.delete({
            where: { id }
        });

        await createLog({
            title: 'Professor deletado',
            description: `Professor ${teacher.nome} deletado com sucesso`,
            userid: teacher.id,
            table: 'teachers',
            level: 'info'
        });
        return c.json({ message: 'Teacher deleted successfully', success: true, data: oldTeacher }, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}