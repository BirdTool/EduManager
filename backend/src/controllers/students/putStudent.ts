import { Context } from "hono";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const putStudent = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const { 
            name, email, phone, birthday, gender, 
            parent1, parent2, notes, classe, matricula 
        } = body;

        // Check if student exists
        const existingStudent = await prisma.students.findUnique({
            where: { id: Number(id) }
        });

        if (!existingStudent) {
            return c.json({ success: false, message: 'Estudante não encontrado' }, 404);
        }

        // Update student with Prisma
        const updatedStudent = await prisma.students.update({
            where: { id: Number(id) },
            data: {
                nome: name || existingStudent.nome,
                email: email || existingStudent.email,
                telefone: phone || existingStudent.telefone,
                aniversario: birthday || existingStudent.aniversario,
                genero: gender || existingStudent.genero,
                responsavel1: parent1 || existingStudent.responsavel1,
                responsavel2: parent2 || existingStudent.responsavel2,
                notas: notes || existingStudent.notas,
                classe: classe || existingStudent.classe,
                matricula: matricula || existingStudent.matricula
            }
        });

        return c.json({ 
            success: true, 
            message: 'Estudante atualizado com sucesso', 
            data: updatedStudent 
        });
    } catch (error: any) {
        console.error('Erro ao atualizar estudante:', error);
        return c.json({ 
            success: false, 
            message: 'Erro ao atualizar estudante', 
            error: error.message 
        }, 500);
    }
}
