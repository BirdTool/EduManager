import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const postStudent = async (c: Context) => {
    try {
        const classroomId = Number(c.req.param('id'));
        const studentId = Number(c.req.param('studentid'));

        // Verifica se a sala de aula existe
        const classroom = await prisma.classrooms.findUnique({
            where: { id: classroomId },
        });

        if (!classroom) {
            return c.json({ success: false, message: 'Sala de aula não encontrada' }, 404);
        }

        const student = await prisma.students.findUnique({
            where: { id: studentId },
        });

        if (!student) {
            return c.json({ success: false, message: 'Estudante não encontrado' }, 404);
        }

        // Update the student to associate with the classroom
        const updatedStudent = await prisma.students.update({
            where: { id: studentId },
            data: {
                classroomId: classroomId,
            }
        });

        return c.json({ 
            success: true, 
            message: 'Estudante adicionado à sala de aula com sucesso',
            data: updatedStudent
        });
    } catch (error: any) {
        console.error('Erro ao adicionar estudante à sala de aula:', error);
        return c.json({ 
            success: false, 
            message: 'Erro ao adicionar estudante à sala de aula', 
            error: error.message 
        }, 500);
    }
}
