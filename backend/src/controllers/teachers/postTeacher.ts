import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { registerSchemaTeacher } from "../../schemas/registerSchema"
import createLog from '../../utils/log'

const prisma = new PrismaClient()

export const postTeacher = async (c: Context) => {
    try {
        const body = await c.req.json();

        const { email, gender, birthday, matery, name, password, phone } = registerSchemaTeacher.parse(body);

        // Check if teacher already exists
        const existingTeacher = await prisma.teachers.findUnique({
            where: { email }
        });

        if (existingTeacher) {
            await createLog({
                title: "Professor já existente",
                description: `O professor ${name} já existe no sistema ao tentar registrar-se um novo professor.`,
                userid: existingTeacher.id,
                table: 'teachers',
                level: 'error'
            })
            return c.json({ error: 'Teacher already exists' }, 400);
        }

        const teacher = await prisma.teachers.create({
            data: {
                nome: name,
                email,
                telefone: phone,
                aniversario: birthday,
                genero: gender,
                disciplinas: matery,
                senha: password
            }
        });

        await createLog({
            title: "Professor criado",
            description: `O professor ${name} foi criado com sucesso.`,
            userid: teacher.id,
            table: 'teachers',
            level: 'info'
        })

        return c.json({ message: "success to create teacher", success: true, data: teacher }, 201);
    } catch (error) {
        console.error(error);
        return c.text('Internal Server Error', 500);
    }
}