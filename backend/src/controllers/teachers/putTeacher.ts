import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

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

        return c.json({ message: 'Teacher updated successfully', success: true, data: newTeacher}, 200);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}