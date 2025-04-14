import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import createLog from '../../../utils/log';

const prisma = new PrismaClient()

export const deleteStudents = async (c: Context) => {
    try {
        const classroomId = Number(c.req.param('id'));
        const studentId = Number(c.req.param('studentid'));

        // Verify classroom exists
        const classroom = await prisma.classrooms.findUnique({
            where: { id: classroomId },
        });

        if (!classroom) {
            return c.json({ success: false, message: 'Sala de aula não encontrada' }, 404);
        }

        // Verify student exists and belongs to this classroom
        const student = await prisma.students.findUnique({
            where: { 
                id: studentId,
                classroomId: classroomId
            },
        });

        if (!student) {
            return c.json({ 
                success: false, 
                message: 'Estudante não encontrado ou não pertence a esta sala de aula' 
            }, 404);
        }

        // Remove student from classroom by setting classroomId to null
        const updatedStudent = await prisma.students.update({
            where: { id: studentId },
            data: {
                classroomId: null,
            }
        });

        await createLog({
            title: 'Remoção de Estudante da Sala de Aula',
            description: `Estudante ${student.nome} removido da sala de aula ${classroom.nome}`,
            userid: student.id,
            table: 'students',
            level: 'info'
        })

        return c.json({ 
            success: true, 
            message: 'Estudante removido da sala de aula com sucesso',
            data: updatedStudent
        });
    } catch (error: any) {
        console.error('Erro ao remover estudante da sala de aula:', error);
        return c.json({ 
            success: false, 
            message: 'Erro ao remover estudante da sala de aula', 
            error: error.message 
        }, 500);
    }
}
