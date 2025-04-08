import { Context } from "hono";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStudents = async (c: Context) => {
    try {
        const id = c.req.param('id');
        
        if (id) {
            const idNumber = Number.parseInt(id);
            if (Number.isNaN(idNumber)) return c.json({ message: "Error, this student does not existing" }, 404);
            const student = await prisma.students.findUnique({
                where: {
                    id: idNumber
                }
            })
    
            if (!student) return c.json({ message: "Error, this student does not existing" }, 404);
    
            return c.json(student);
        }
    
        const students = await prisma.students.findMany({})
        
        return c.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        return c.json({ message: "Error fetching students" }, 500);
    }
}