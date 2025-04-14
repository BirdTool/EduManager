import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../utils/log';

const prisma = new PrismaClient()

export const putTeacher = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'));

        if (!id || isNaN(id)) {
            return c.json({ error: 'Invalid ID' }, 400);
        }

        const body = await c.req.json();

        const { email, gender, birthday, matery, name, password, phone } = body;

        const teacher = await prisma.teachers.findUnique({
            where: { id }
        });

        if (!teacher) {
            await createLog({
                title: 'Professor não encontrado',
                description: `Professor com ID ${id} não foi encontrado ao tentar atualizar os dados do professor`,
                table: 'teachers',
                level: 'warn'
            })
            return c.json({ error: 'Teacher not found' }, 404);
        }

        const newTeacher = await prisma.teachers.update({
            where: { id },
            data: {
                nome: name || teacher.nome,
                email: email || teacher.email,
                telefone: phone || teacher.telefone,
                aniversario: birthday || teacher.aniversario,
                genero: gender || teacher.genero,
                disciplinas: matery || teacher.disciplinas,
                senha: password || teacher.senha
            }
        });

        await createLog({
            title: 'Professor atualizado',
            description: `O professor ${teacher.nome} foi atualizado com sucesso.`,
            userid: teacher.id,
            table: 'teachers',
            level: 'info'
        })

        return c.json({ message: 'Teacher updated successfully', success: true, data: newTeacher}, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}