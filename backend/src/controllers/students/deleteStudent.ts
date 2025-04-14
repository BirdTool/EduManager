import { Context } from 'hono'
import { PrismaClient, Prisma } from '@prisma/client'
import createLog from '../../utils/log'

const prisma = new PrismaClient()

export const deleteStudent = async (c: Context) => {
    try {
        const id = c.req.param('id')
        const studentId = Number(id)
        
        // Check if student exists
        const existingStudent = await prisma.students.findUnique({
            where: { id: studentId }
        })

        if (!existingStudent) {
            await createLog({
                title: "Erro ao deletar estudante",
                description: `O estudante com o id ${studentId} não existe`,
                table: 'students',
                level: 'error'
            })
            return c.json({ message: "Error, this student does not exist" }, 404)
        }

        // First, delete related records to handle the foreign key constraint
        await prisma.$transaction(async (tx) => {
            // Delete related records first
            await tx.records.deleteMany({
                where: { studentid: studentId }
            })
            
            // Then delete the student
            await tx.students.delete({
                where: { id: studentId }
            })
        })

        await createLog({
            title: "Estudante deletado",
            description: `O estudante com o id ${studentId} foi deletado`,
            table: 'students',
        })
    
        return c.json({ 
            message: "Student deleted successfully", 
            data: existingStudent 
        })
    } catch (error) {
        console.error("Error deleting student:", error)
        
        // Check if it's a foreign key constraint error
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
            return c.json({ 
                message: "Cannot delete student because they have related records in the system. Please delete those records first." 
            }, 400)
        }
        
        return c.json({ message: "Error deleting student" }, 500)
    }
}
